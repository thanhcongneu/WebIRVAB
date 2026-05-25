import { Injectable } from '@nestjs/common';

export interface StockData {
  symbol: string;
  exchange: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  high52w: string;
  low52w: string;
}

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

@Injectable()
export class StocksService {
  getCurrent(): StockData {
    // Mocked stock data - replace with real API call (VNX, HOSE)
    return {
      symbol: 'VAB',
      exchange: 'HOSE',
      price: '15,200',
      change: '+180',
      changePercent: '+1.20%',
      volume: '1,245,600',
      marketCap: '8,540',
      high52w: '18,500',
      low52w: '11,200',
    };
  }

  getHistorical(days: number = 365): HistoricalPrice[] {
    // Mocked historical data - replace with real API
    const data: HistoricalPrice[] = [];
    const basePrice = 15000;
    const now = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const variance = (Math.random() - 0.5) * 500;
      const close = basePrice + variance;
      const open = close + (Math.random() - 0.5) * 200;
      const high = Math.max(open, close) + Math.random() * 150;
      const low = Math.min(open, close) - Math.random() * 150;
      const volume = Math.floor(Math.random() * 2000000) + 500000;

      data.push({
        date: date.toISOString().split('T')[0],
        open: Math.round(open * 10) / 10,
        high: Math.round(high * 10) / 10,
        low: Math.round(low * 10) / 10,
        close: Math.round(close * 10) / 10,
        volume,
      });
    }

    return data;
  }
}
