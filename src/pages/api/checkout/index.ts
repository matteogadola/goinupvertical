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
import { sendConfirmationMail } from '@/lib/mail';
import { createOrder } from '@/lib/orders';
import { createCheckoutSession } from './stripe';
import { getEvent } from '@/lib/events';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, body } = req;

  if (method !== 'POST') {
    return res.status(405).send('');
  }

  try {
    console.debug(`[checkout] body: ${JSON.stringify(body)}`);
    const order = await createOrder(body);
    console.debug(`[checkout] order: ${JSON.stringify(order)}`);
    if (order.payment_method === 'cash') {
      await sendConfirmationMail(order);
      return res.json(order);
    } else if (order.payment_method === 'stripe') {
      const promoter = (await getEvent(order.items[0].event_id!))?.promoters ?? undefined;
      const { id } = await createCheckoutSession(headers, order, promoter);
      return res.json({ ...order, stripeAccount: promoter?.stripe_account, checkoutSessionId: id });
    } else {
      throw new Error('Metodo di pagamento non supportato');
    }
  } catch (e: any) {
    console.error(`[checkout] error: ${e.message}`);
    return res.status(500).json({ error: e.message });
  }
}
