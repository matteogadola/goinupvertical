export interface Event {
  id: string;
  type: 'race' | ''; // che può essere race/course, dinner, ... ? o meno specifico?
  name: string;
  edition: number;
  date: string;
  promoter_id: number;
  capacity: number;
  status: 'open' | 'close' | 'sold-out';
  detail: EventDetail | null;
  summary: string | null;
  description: string | null;
  body: string | null;
  banner: string | null;
}

export interface EventDetail {
  distance: number;
  elevationGain: number;
  startLine: string;
  finishLine: string;
}
