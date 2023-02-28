//import 'server-only';
import { Order, OrderItem } from '@/types/orders';
import { pool } from './pg';
import { dt } from './date';
import CodiceFiscale from 'codice-fiscale-js';
import { Entry } from '@/types/entries';
import supabase from './supabase';

const createOrder = async (params: Partial<Order>) => {
  if (params?.items === undefined || params.items.length === 0) {
    throw new Error('Il carrello non può essere vuoto');
  }

  const client = await pool.connect();
  const items: OrderItem[] = [];

  // CONTROLLA PREZZI

  try {
    await client.query('BEGIN');

    const { rows: orders } = await client.query<Omit<Order, 'items'>>(
      `INSERT INTO orders (user_email, amount, date, payment_method, payment_status)
      VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [
        params.user_email ?? params.items[0].entry.email,
        params.items.reduce((a, c) => a + c.price, 0),
        dt().utc().format(),
        params.payment_method,
        params.payment_method === 'stripe' ? 'intent' : 'pending',
      ]
    );
    const order = orders[0];

    for (let item of params.items) {
      const { rows: orderDetails } = await client.query(
        `INSERT INTO order_details (order_id, item_id, price, description)
        VALUES($1, $2, $3, $4) RETURNING id`,
        [order.id, item.id, item.price, item?.description]
      );
      const orderDetail = orderDetails[0];
      const count = items.push(item);

      if (item?.entry) {
        const cf = new CodiceFiscale(item.entry.tin);

        if (!cf.isValid()) {
          throw new Error(`Codice fiscale ${item.entry.tin} non valido`);
        }

        const checkTin = new CodiceFiscale({
          name: item.entry.first_name,
          surname: item.entry.last_name,
          gender: cf.gender,
          day: cf.day,
          month: cf.month,
          year: cf.year,
          birthplace: cf.birthplace.nome,
          birthplaceProvincia: '',
        });

        if (checkTin.toString() !== cf.cf) {
          throw new Error(`Corrispondenza codice fiscale non valida`);
        }

        //await createEntry()
        const { rows: entries } = await client.query<Entry>(
          `INSERT INTO entries (order_detail_id, item_id, first_name, last_name, birth_date, birth_place,
            gender, country, team, email, phone_number, tin)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *`,
          [
            orderDetail.id,
            item.id,
            item.entry.first_name,
            item.entry.last_name,
            item.entry.birth_date ??
              `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
            item.entry.birth_place ?? cf.birthplace.nome,
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

const updateOrder = async (id: number, params: Partial<Order>) => {
  const { data, error } = await supabase.from('orders').update(params).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export { createOrder, updateOrder };
