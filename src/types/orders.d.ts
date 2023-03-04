export interface Order {
  id: number;
  user_id: string | null;
  user_email: string;
  date: string;
  status: string;
  notification_date: string;
  notification_status: string;
  payment_id: string | null;
  payment_date: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  items: OrderItem[];
}

export type OrderStatus = 'created' | 'published' | 'scheduled' | 'cancelled' | 'postponed' | 'confirmed';

export type PaymentMethod = 'stripe' | 'sepa' | 'cash';
export type PaymentStatus = 'intent' | 'pending' | 'paid' | 'failed';

export interface OrderItem {
  id: number;
  event_id?: string; // ???
  name: string;
  quantity: number;
  price: number; //
  description?: string | null;
  entry?: Entry;
}
