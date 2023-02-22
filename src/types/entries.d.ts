export interface Entry {
  id: number,
  first_name: string;
  last_name: string;
  tin: string;
  email: string;
  phone_number: string;
  team: string | null;
  country: string;
  birth_place: string | null;
  birth_date: string;
  gender: 'M' | 'F';
  privacy_policy?: boolean;
}