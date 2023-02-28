import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
//import { Entry } from '@models/types'
import { Client } from 'pg';
import { pool } from '@/lib/pg';
import { dt } from '@/lib/date';
//import { Item, Order, OrderItem } from '@models/types'
//import { Parser, Validator } from '@marketto/codice-fiscale-utils'
import CodiceFiscale from 'codice-fiscale-js';
import { Order, OrderItem } from '@/types/orders';
import { Entry } from '@/types/entries';
import supabase from '@/lib/supabase';
import { sendMail } from '@/lib/mail';

export async function POST(req: NextApiRequest) {
  const { method, headers, body } = req;

  const data = await createOrder(body);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

const createOrder = async (orderData: Pick<Order, 'payment_method' | 'items'>) => {
  if (!orderData.items.length) {
    throw new Error('Il carrello non può essere vuoto');
  }

  const client = await pool.connect();
  const items: OrderItem[] = [];

  try {
    await client.query('BEGIN');

    const { rows: orders } = await client.query<Omit<Order, 'items'>>(
      `
      INSERT INTO orders (date, payment_method, payment_status)
      VALUES($1, $2) RETURNING *`,
      [dt().utc(), orderData.payment_method, ['sepa', 'cash'].includes(orderData.payment_method) ? 'pending' : null]
    );
    const order = orders[0];

    for (let item of orderData.items) {
      await client.query(
        `
        INSERT INTO order_details (order_id, item_id, price, description)
        VALUES($1, $2, $3) RETURNING id`,
        [order.id, item.id, item.price, item?.description]
      );
      const count = items.push(item);

      if (item?.entry) {
        const cf = new CodiceFiscale(item.entry.tin);

        if (!cf.isValid()) {
          throw new Error(`Codice fiscale ${item.entry.tin} non valido`);
        }

        const { rows: entries } = await client.query<Entry>(
          `
          INSERT INTO entries (order_id, item_id, first_name, last_name, birth_date, birth_place,
            gender, country, team, email, phone_number, tin)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *`,
          [
            order.id,
            item.id,
            item.entry.first_name,
            item.entry.last_name,
            item.entry.birth_date ??
              `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
            item.entry.birth_place ?? cf.birthplace,
            item.entry.gender ?? cf.gender,
            item.entry.country,
            item.entry.team,
            item.entry.email,
            item.entry.phone_number,
            item.entry.tin,
          ]
        );
        items[count - 1].entry = entries[0];
      }
    }

    await client.query('COMMIT');

    if (['sepa', 'cash'].includes(order.payment_method)) {
      await sendMail();
    }

    return { ...order, items };
  } catch (e: any) {
    await client.query('ROLLBACK');

    if (e.code === '23505') {
      if (e.constraint === 'entries_unique') {
        const lastEntry = items.pop();
        throw new Error(`${lastEntry?.entry?.first_name} ${lastEntry?.entry?.last_name} risulta già iscritto`);
        //throw new Error(`Un partecipante risulta già iscritto`)
      }
      //table: 'entries',
      //column: undefined,
      //dataType: undefined,
      //constraint: 'entries_unique',
      //detail: 'Key (item_id, tin)=(1002, GDLMTT88R21F712C) already exists.',
    }

    console.error(e.message);
    throw e;
  } finally {
    client.release();
  }
};
