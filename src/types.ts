export interface InitMessage {
  event: string;
  channel: string;
  symbol: string;
}

export interface Structure {
  name: string;
  last: number;
  change: number;
  changeRelative: number;
  high: number;
  low: number;
}
