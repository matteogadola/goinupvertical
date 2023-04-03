//import 'server-only';
import { Order, OrderItem } from '@/types/orders';
import { pool } from './pg';
import { dt } from './date';
import { Entry } from '@/types/entries';
import supabase from './supabase';
import { calcStripeTax, capitalize, verifyTin } from './helpers';
import { db } from './firebase';

export const getOrder = async (id: number) => {
  const { data } = await supabase.from('orders').select().eq('id', id).returns<Order[]>().single();

  if (data !== null) {
    const { data: items } = await supabase.from('order_items').select().eq('order_id', id).returns<OrderItem[]>();
    data.items = items ?? [];
  }

  return data;
};

const createOrder = async (params: Partial<Order>) => {
  if (params?.items === undefined || params.items.length === 0) {
    throw new Error('Il carrello non può essere vuoto');
  }

  const carnetItems = [
    { id: 1002, event_id: 'cech-vertical-2' },
    { id: 1003, event_id: 'riscio-up-1' },
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

  const client = await pool.connect();
  const orderItems: OrderItem[] = [];
  const entries: any[] = [];

  try {
    // "verifico" il prezzo lato server
    for (let item of params.items) {
      const { rows: items } = await client.query<{ name: string; price: number }>(
        'SELECT name, price FROM items WHERE id = $1',
        [item.id]
      );

      if (items.length === 0 || items[0]?.price !== item.price || items[0]?.name !== item.name) {
        console.warn(`[createOrder] errore nella richiesta: ${JSON.stringify(params.items)}`);
        throw new Error('Errore nella richiesta');
      }

      /*if (item?.entry) {
        if (item.item_id === 1001) {
          // for
        } else {
          const { rows } = await client.query<{ name: string; price: number }>(
            `SELECT *
            FROM entries
            INNER JOIN orders ON entries.order_id = orders.id
            WHERE orders.payment_method = 'stripe' AND orders.payment_status <> 'paid'
            AND entries.event_id = NEW.event_id AND tin = NEW.tin
            INTO item;
            
            
            SELECT id FROM entries WHERE tin = $1 AND event_id = $2`,
            [item.id, item.event_id]
          );
        }
      }*/
    }

    await client.query('BEGIN');

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
    console.debug(`[createOrder] order: ${JSON.stringify(order)}`);

    for (let item of params.items) {
      if (item?.description) {
        item.description = capitalize(item.description);
      }

      const { rows: orderItemRows } = await client.query(
        `INSERT INTO order_items (order_id, item_id, name, price, description)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [order.id, item.id, item.name, item.price, item?.description]
      );
      const orderItem = orderItemRows[0];
      const count = orderItems.push(orderItem);
      //orderItems.push(orderItem);

      // tarrozzata, poi rimarrà questa senza la seconda clausola
      /*if (item?.entry && item.id !== 1001) {
        item.entry.first_name = capitalize(item.entry.first_name);
        item.entry.last_name = capitalize(item.entry.last_name);

        const cf = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);

        try {
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
        } catch (e: any) {
          if (e.code === '23505' && e.constraint === 'entries_unique') {
            const { rows } = await client.query(
              `SELECT orders.id
              FROM entries
              INNER JOIN order_items ON entries.order_item_id = order_items.id
              INNER JOIN orders ON order_items.order_id = orders.id
              WHERE payment_method = 'stripe' AND payment_status <> 'paid'
              AND event_id = $1 AND tin = $2`,
              [item.entry.event_id, item.entry.tin]
            );

            if (rows.length > 0) {
              await client.query(
                `UPDATE entries
                SET order_item_id = $3, item_id = $4, first_name = $5, last_name = $6,
                birth_date = $7, birth_place = $8, gender = $9, country = $10, team = $11, email = $12, phone_number = $13
                FROM order_items INNER JOIN orders ON order_items.order_id = orders.id
                WHERE entries.order_item_id = order_items.id AND payment_method = 'stripe' AND payment_status <> 'paid
                AND event_id = $1 AND tin = $2`,
                [
                  item.event_id,
                  item.entry.tin,
                  orderItem.id,
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
                ]
              );
            } else {
              throw new Error(
                `${item.entry.first_name} ${item.entry.last_name} risulta già ${
                  item.entry.gender === 'F' ? 'iscritta' : 'iscritto'
                }`
              );
            }
          }

          throw e;
        }

        //orderItems[count - 1].entry = entrieRows[0]; // SERVE???
        entries.push({
          order_id: order.id,
          item_id: item.id,
          event_id: item.event_id,
          first_name: item.entry.first_name,
          last_name: item.entry.last_name,
          birth_date:
            item.entry.birth_date ??
            `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
          birth_place: item.entry.birth_place ?? cf.birthplace.nome,
          gender: item.entry.gender ?? cf.gender,
          country: item.entry.country,
          team: item.entry.team,
          email: item.entry.email,
          phone_number: item.entry.phone_number,
          tin: item.entry.tin,
        });
      }*/

      // tarrozzata !
      if (item?.entry && item.id === 1001) {
        item.entry.first_name = capitalize(item.entry.first_name);
        item.entry.last_name = capitalize(item.entry.last_name);
        const cf = verifyTin(item.entry.tin, item.entry.first_name, item.entry.last_name);

        for (let row of carnetItems) {
          /*
            ON CONFLICT ON CONSTRAINT entries_unique
            DO UPDATE SET order_item_id = $1, item_id = $2, first_name = $4, last_name = $5,
            birth_date = $6, birth_place = $7, gender = $8, country = $9, team = $10, email = $11, phone_number = $12
            WHERE entries.event_id = $3 AND entries.tin = $13*/
          const { rows: entrieRows } = await client.query<Entry>(
            `INSERT INTO entries (order_item_id, order_id, item_id, event_id, first_name, last_name, birth_date, birth_place,
            gender, country, team, email, phone_number, tin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT ON CONSTRAINT entries_unique
            DO UPDATE SET order_item_id = excluded.order_item_id, order_id = excluded.order_id, item_id = excluded.item_id,
            first_name = excluded.first_name, last_name = excluded.last_name, birth_date = excluded.birth_date,
            birth_place = excluded.birth_place, gender = excluded.gender, country = excluded.country, team = excluded.team,
            email = excluded.email, phone_number = excluded.phone_number
            WHERE entries.event_id = excluded.event_id AND entries.tin = excluded.tin`,
            [
              orderItem.id,
              order.id,
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
          entries.push({
            order_item_id: orderItem.id,
            order_id: order.id,
            item_id: row.id,
            event_id: row.event_id,
            first_name: item.entry.first_name,
            last_name: item.entry.last_name,
            birth_date:
              item.entry.birth_date ??
              `${cf.year}-${String(cf.month).padStart(2, '0')}-${String(cf.day).padStart(2, '0')}`,
            birth_place: item.entry.birth_place ?? cf.birthplace.nome,
            gender: item.entry.gender ?? cf.gender,
            country: item.entry.country,
            team: item.entry.team,
            email: item.entry.email,
            phone_number: item.entry.phone_number,
            tin: item.entry.tin,
          });
        }
      }
    }

    // add tax
    if (params.payment_method === 'stripe') {
      const tax = calcStripeTax(params.items);

      const { rows: orderItemTaxRows } = await client.query(
        `INSERT INTO order_items (order_id, name, price)
        VALUES($1, $2, $3) RETURNING *`,
        [order.id, 'Commissioni di servizio', tax]
      );
      const orderItemTax = orderItemTaxRows[0];
      orderItems.push(orderItemTax);
    }

    if (process.env.NODE_ENV === 'production') {
      await db.runTransaction(async (t) => {
        t.set(db.collection('orders').doc(order.id.toString()), { ...order, items: orderItems });

        for (let item of entries) {
          t.set(db.collection('events').doc(item.event_id).collection('entries').doc(item.tin), item);
        }
      });
    }

    await client.query('COMMIT');
    return { ...order, items: orderItems };
  } catch (e: any) {
    await client.query('ROLLBACK');
    console.warn(`[createOrder] errore: ${JSON.stringify(e.message)}`);

    if (e.code === '23505') {
      if (e.constraint === 'entries_unique') {
        console.warn(`[createOrder] non dovrebbe più capitare: ${JSON.stringify(e.message)}`);
        const lastEntry = orderItems.pop();
        throw new Error(`${lastEntry?.description} risulta già iscritto`);
      }
    }
    throw new Error(`Errore interno ${e.code}`);
  } finally {
    client.release();
  }
};

const updateOrder = async (id: number, params: Partial<Order>) => {
  try {
    const { data, error } = await supabase.from('orders').update(params).eq('id', id);

    if (process.env.NODE_ENV === 'production') {
      const orderRef = db.collection('orders').doc(id.toString());
      await orderRef.update(params);
    }

    if (error) {
      console.warn(`[updateOrder] error: ${error.message}`);
      throw new Error(error.message);
    }

    return data;
  } catch (e: any) {
    console.warn(`[updateOrder] exception: ${e.message}`);
    throw e;
  }
};

export { createOrder, updateOrder };
