export interface Item {
  id: number;
  event_id: string;
  name: string;
  category: string;
  summary: string | null;
  description: string | null;
  detail: any;
  price: number;
  stock: number;
  status: string;
}
