export interface Event {
  id: string;
  category: 'race' | 'food' | 'pass';
  name: string;
  edition: number;
  date: string;
  promoter_id: number;
  capacity: number;
  status: 'internal' | 'published' | 'open' | 'close' | 'stockout';
  detail: EventDetail | null; // Partial?
  summary: string | null;
  description: string | null;
  body: string | null;
  flyer: string | null;
}

/**
 * internal - evento creato ma non visibile in alcun modo
 * published - evento visibile solo con link diretto
 * open - evento visibile anche da home page (events widget)
 * close - evento visibile ma con icona closed
 * stockout - evento visibile ma con icona sold-out
 */

export interface EventDetail {
  distance: number;
  elevationGain: number;
  startLine: string;
  finishLine: string;
}
