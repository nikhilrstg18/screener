export interface NSEResponse {
  name?: string;
  advance?: Advance;
  timestamp?: Date;
  data?: NSEData[];
  metaData?: MetaData;
  marketStatus?: MarketStatus;
  date30dAgo?: string;
  date365dAgo?: string;
}
export interface MarketStatus {
  market: string;
  marketStatus: string;
  tradeDate: string;
  index: string;
  last: number;
  variation: number;
  percentChange: number;
  marketStatusMessage: string;
}
export interface MetaData {
  indexName: string;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  last: number;
  percChange: number;
  change: number;
  timeVal: string;
  yearHigh: number;
  yearLow: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  ffmc_sum: number;
}
export interface NSEData {
  priority: number;
  symbol: string;
  identifier: string;
  open: number;
  dayHigh: number;
  dayLow: number;
  lastPrice: number;
  previousClose: number;
  change: number;
  pChange: number;
  ffmc: number;
  yearHigh: number;
  yearLow: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  lastUpdateTime: string;
  nearWKH: number;
  nearWKL: number;
  perChange365d: number;
  date365dAgo: string;
  chart365dPath: string;
  date30dAgo: string;
  perChange30d: number;
  chart30dPath: string;
  chartTodayPath: string;
  ohl: string;
  ppColor: string;
  pp: number;
  s1Color: string;
  s1: number;
  s2Color: string;
  s2: number;
  s3Color: string;
  s3: number;
  r1Color: string;
  r1: number;
  r2Color: string;
  r2: number;
  r3Color: string;
  r3: number;
  callStrength: number;
  call: string;
}

export interface Advance {
  declines: number;
  advances: number;
  unchanged: number;
}
