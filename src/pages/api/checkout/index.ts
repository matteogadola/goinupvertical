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
import { sendConfirmationMail, sendMail } from '@/lib/mail';
import { createOrder } from '@/lib/orders';
import { createCheckoutSession } from './stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, body } = req;

  if (method !== 'POST') {
    return res.status(405).send('');
  }

  try {
    const order = await createOrder(body);
    if (['sepa', 'cash'].includes(order.payment_method)) {
      await sendConfirmationMail(order);
      return res.json(order);
    } else if (order.payment_method === 'stripe') {
      console.log('qui');
      const { id } = await createCheckoutSession(headers, order);
      console.log('qui due');
      return res.json({ ...order, checkoutSessionId: id });
    } else {
      throw new Error('Metodo di pagamento non supportato');
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
