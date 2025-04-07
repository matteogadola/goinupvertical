export interface Entry {
  id: number;
  order_item_id: number | null;
  order_id: number | null;
  product_id: number | null;
  event_id: string | null;
  first_name: string;
  last_name: string;
  tin: string;
  email: string;
  phone_number: string;
  club: string | null;
  fidal_card: string | null;
  country: string;
  birth_place: string | null;
  birth_date: string;
  birth_year?: number;
  gender: 'M' | 'F';
  bib_number: smallint;
}


export interface RaceEntry {
  order_id: number | null;
  order_item_id: number | null;
  event_id: string | null;
  product_id: number | null;
  product_type: string | null;
  order_item_event_id: string | null;
  date: string;
  payment_method: string,
  payment_id: string,
  payment_date: string,
  payment_status: string,
  notification_id: string,
  notification_date: string,
  notification_status: string,
  first_name: string;
  last_name: string;
  tin: string;
  birth_year: number;
  gender: 'M' | 'F';
  club: string | null;
  fidal_card: string | null;
  email: string;
  phone_number: string;
}

export type SerieEntry = Pick<RaceEntry,
  | 'order_id'
  | 'order_item_id'
  | 'event_id' // order_item_event_id
  | 'product_type'
  | 'date'
  | 'payment_method'
  | 'payment_id'
  | 'payment_status'
  | 'first_name'
  | 'last_name'
  | 'tin'
  | 'birth_year'
  | 'gender'
  | 'club'
  | 'email'
  | 'phone_number'
>

export type PartialEntry = Pick<
  Entry,
  | 'event_id'
  | 'first_name'
  | 'last_name'
  | 'birth_year'
  | 'gender'
  | 'team'
>

/*
export interface Entry {
  first_name: string,
  last_name: string,
  tin: string,
  gender: 'M' | 'F',
  birth_date: string,
  birth_place: string,
  club: string,
  email: string,
  phone_number: string,
}
  
export interface Entry {
  id: number;
  order_item_id: number;
  item_id: number;
  event_id: string;

  first_name: string;
  last_name: string;
  tin: string;
  gender: '' | 'M' | 'F';
  birth_date: string,
  birth_place: string,

  fidal_card: string;
  country: string;
  bib_number: smallint;
  
  club: string,
  email: string,
  phone_number: string,
}
*/
export type EntryForm = Pick<
  Entry,
  | 'first_name'
  | 'last_name'
  | 'tin'
  | 'gender'
  | 'birth_date'
  | 'birth_place'
  | 'club'
  | 'email'
  | 'phone_number'
>





