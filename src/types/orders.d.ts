import type { Entry } from './entries';

export type OrderStatus = 'pending' | 'partially_confirmed' | 'confirmed' | 'requires_review' | 'cancelled';
export type PaymentMethod = 'stripe' | 'sepa' | 'cash' | 'on-site';
export type PaymentStatus = 'intent' | 'pending' | 'partially_paid' | 'paid' | 'failed' | 'expired' | 'cancelled';

export interface Order {
  id: number;
  user_id: string | null;
  date: string;
  status: OrderStatus;
  amount: number
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  notification_id: string | null,
  notification_date: string | null;
  notification_status: string | null;
  payment_id: string | null;
  payment_date: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  date: string;
  event_id: string | null;
  product_id: string | null;
  name: string | null;
  description: string | null;
  price: number;
  quantity: number;
  payment_id: string | null;
  payment_date: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_recorded_by: string | null;
  entry?: Entry;
}
