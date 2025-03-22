'use server';

import { createClient } from '@/utils/supabase/server';
import type { Order } from '@/types/orders';
import { FunctionsHttpError } from '@supabase/supabase-js';

interface Mail {
  to: string;
  subject: string;
  body: string;
  sender?: string;
  headers?: any
}

export const sendMail = async (mail: Mail) => {
  const supabase = await createClient()

  const { data, error } = await supabase.functions.invoke('mail', {
    method: 'POST',
    body: JSON.stringify({
      sender: { email: 'noreply@goinupvertical.it', name: 'GOinUP' },
      replyTo: { email: 'noreply@goinupvertical.it', name: 'GOinUP' },
      to: [{ email: mail.to }],
      subject: mail.subject,
      htmlContent: mail.body,
    }),
  })

  if (error instanceof FunctionsHttpError) {
    const { message } = await error.context.json()
    throw new Error(message)
  } else if (error) {
    throw new Error(error.message)
  }

  return data
};

export const sendCheckoutMail = async (order: Order) => {
  const supabase = await createClient()

  const { data, error } = await supabase.functions.invoke('mail-checkout', {
    method: 'POST',
    body: order,
  })

  if (error instanceof FunctionsHttpError) {
    const { message } = await error.context.json()
    throw new Error(message)
  } else if (error) {
    throw new Error(error.message)
  }

  return data
};
