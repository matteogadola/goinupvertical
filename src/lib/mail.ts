import { Order } from '@/types/orders';

interface Mail {
  to: string;
  subject: string;
  body: string;
}

export const sendMail = async (mail: Mail) => {
  await fetch('https://api.useplunk.com/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PLUNK_API_KEY}`,
    },
    body: JSON.stringify(mail),
  });
};

export const sendConfirmationMail = async (order: Order) => {
  //const html = render(<Confirm order={order} />);

  const detail = order.items.map(
    (item) => `
    <tr>
      <td style="padding: 0.5rem 0;">${item.name}</td>
      <td style="padding: 0.5rem 0;">${item.description}</td>
      <td style="padding: 0.5rem 0;">${item.quantity}</td>
      <td style="padding: 0.5rem 0;">${item.price / 100}€</td>
    </tr>`
  );

  //const paymentDetail =

  await sendMail({
    to: 'gadola.matteo@gmail.com',
    subject: `Conferma ordine GOinUP`,
    body: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html>
        <head>
          <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
          <title>Conferma ordine GOinUP</title>
          <link href="https://fonts.googleapis.com/css2?family=Unbounded" rel="stylesheet" />
        </head>
        <body>

          <div style="font-family: 'Unbounded', Verdana; font-weight: 700; text-transform: uppercase;">
            <h2 style="color: #6FB06A;">Conferma</h1>
            <h1>Ordine n. ${order.id}</h1>
          </div>
          <p>Grazie per aver completato l'ordine su GOinUP</p>

          <table style="border-width: 1px; border-color: #94A3B8;">
            <thead>
              <tr style="background-color: #E2E8F0;">
                <td style="width: 15rem; border-bottom-width: 1px; padding: 0.5rem 0;">Riferimento</td>
                <td style="width: 10rem; border-bottom-width: 1px; padding: 0.5rem 0;">Descrizione</td>
                <td style="width: 5rem; border-bottom-width: 1px; padding: 0.5rem 0;">Quantità</td>
                <td style="width: 5rem; border-bottom-width: 1px; padding: 0.5rem 0;">Prezzo</td>
              </tr>
            </thead>
            <tbody>
              ${detail}
            </tbody>
          </table>

          <div>
          </div>

        </body>
      </html>
      `,
  });
};
