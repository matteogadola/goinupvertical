export interface Order {
  id: number,
  user_id: string | null,
  date: string,
  payment_id: string | null,
  payment_date: string | null;
  payment_method: string;
  payment_status: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  name: string; //
  price: number; //
  description?: string | null;
  entry?: Entry;
}