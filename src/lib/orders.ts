//import 'server-only';
import { Order, OrderItem } from '@/types/orders';
import { pool } from './pg';
import { dt } from './date';
import CodiceFiscale from 'codice-fiscale-js';
import { Entry } from '@/types/entries';
import supabase from './supabase';
import { verifyTin } from './helpers';

const createOrder = async (params: Partial<Order>) => {
  if (params?.items === undefined || params.items.length === 0) {
    throw new Error('Il carrello non può essere vuoto');
  }

  const client = await pool.connect();
  const orderItems: OrderItem[] = [];

  // CONTROLLA PREZZI

  try {
    await client.query('BEGIN');

    // "verifico" il prezzo lato server
    for (const [key, item] of params.items.entries()) {
      const { rows } = await client.query<{ price: number }>('SELECT price FROM items WHERE id = $1', [item.id]);
      const price = rows[0]?.price;

      if (price !== params.items[key].price) {
        throw new Error('Errore nella richiesta');
      }
    }

    const { rows: orders } = await client.query<Omit<Order, 'items'>>(
      `INSERT INTO orders (user_id, user_email, amount, date, payment_method, payment_status)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        params.user_id ?? null,
        params.user_email,
        params.items!.reduce((a, c) => a + c.price, 0),
        dt().utc().format(),
        params.payment_method,
        params.payment_method === 'stripe' ? 'intent' : 'pending',
      ]
    );
    const order = orders[0];

    for (let item of params.items) {
      const { rows: orderItemRows } = await client.query(
        `INSERT INTO order_items (order_id, item_id, name, price, description)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [order.id, item.id, item.name, item.price, item?.description]
      );
      const orderItem = orderItemRows[0];
      const count = orderItems.push(orderItem);
      //orderItems.push(orderItem);

      // tarrozzata, poi rimarrà questa senza la seconda clausola
      if (item?.entry && item.id !== 1001) {
        const cf = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);
        const { rows: entrieRows } = await client.query<Entry>(
          `INSERT INTO entries (order_item_id, item_id, event_id, first_name, last_name, birth_date, birth_place,
            gender, country, team, email, phone_number, tin)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            orderItem.id,
            item.id,
            item.event_id,
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

        //orderItems[count - 1].entry = entrieRows[0]; // SERVE???
      }

      // tarrozzata !
      if (item?.entry && item.id === 1001) {
        const cf = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);
        const lista = [
          { id: 1002, event_id: 'cech-vertical-2' },
          { id: 1003, event_id: 'risc-up-1' },
          { id: 1004, event_id: 'larg-up-5' },
          { id: 1005, event_id: 'lave-nsu-4' },
          { id: 1006, event_id: 'vertical-egul-4' },
          { id: 1007, event_id: 'vertical-lino-4' },
          { id: 1008, event_id: 'kurt-up-4' },
          { id: 1009, event_id: 'sostila-vertical-1' },
          { id: 1010, event_id: 'colmen-vertical-9' },
          { id: 1011, event_id: 'san-giorgio-vertical-2' },
          { id: 1012, event_id: 'arz-up-7' },
        ];

        for (let row of lista) {
          const { rows: entrieRows } = await client.query<Entry>(
            `INSERT INTO entries (order_item_id, item_id, event_id, first_name, last_name, birth_date, birth_place,
            gender, country, team, email, phone_number, tin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
              orderItem.id,
              row.id,
              row.event_id,
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

          //orderItems[count - 1].entry = entrieRows[0];
        }
      }
    }
    await client.query('COMMIT');
    return { ...order, items: orderItems };
  } catch (e: any) {
    await client.query('ROLLBACK');

    if (e.code === '23505') {
      if (e.constraint === 'entries_unique') {
        const lastEntry = orderItems.pop();
        throw new Error(`${lastEntry?.description} risulta già iscritto`);
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
