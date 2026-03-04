export interface Event {
  id: string
  name: string
  slug: { current: string }
  type: 'race' | 'serie' | 'meal' | 'award-ceremony'; // 'carnet' 

  edition: number;
  date: string
  capacity: number;
  status: EventStatus;
  details: EventDetail;
  summary: string | null;
  summary_image: string | null;
  description: string | null;
  body: string | null;
  flyer: string | null;
  regulation: string | null;
  attachments?: Attachment[];
  promoter?: { id: string, name: string; stripe_account: string; };
  items?: Item[];
  closing_date?: string;
  links: any[]
  products: Product[];

  results?: any[];
}

export interface EventDetail {
  race_tag: string
  distance: number
  elevation_gain: number
  start_line: string
  finish_line: string
}
