export enum TradeDirection {
  HIGHER = "HIGHER",
  LOWER = "LOWER"
}

export enum TradeResult {
  WIN = "WIN",
  LOSS = "LOSS",
  PENDING = "PENDING"
}

export interface LiveMarketUpdate {
  type: "MARKET_UPDATE";
  symbol: string;
  price: number;
  change: number;
}
