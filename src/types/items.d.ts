export interface Item {
  id: number;
  category: string;
  name: string;
  summary: string | null;
  description: string | null;
  detail: any;
  price: number;
  stock: number;
  status: string;
}