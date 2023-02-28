export interface Event {
  id: string;
  category: 'race' | 'food' | 'pass';
  name: string;
  edition: number;
  date: string;
  promoter_id: number;
  capacity: number;
  status: 'internal' | 'published' | 'scheduled' | 'cancelled' | 'postponed' | 'stockout';
  detail: Partial<EventDetail> | null;
  summary: string | null;
  description: string | null;
  body: string | null;
  flyer: string | null;
}

/**
 * internal - evento creato ma non visibile in alcun modo
 * published - evento visibile solo con link diretto
 * scheduled - evento visibile anche da home page (events widget)
 * cancelled
 * postponed
 * stockout
 */

export interface EventDetail {
  distance: number;
  elevationGain: number;
  startLine: string;
  finishLine: string;
}
