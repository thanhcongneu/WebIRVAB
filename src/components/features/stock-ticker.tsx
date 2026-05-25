'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { StockData } from '@/types';
import clsx from 'clsx';

interface StockTickerProps {
  data: StockData;
  className?: string;
}

export function StockTicker({ data, className }: StockTickerProps) {
  const isPositive = parseFloat(data.change) >= 0;

  return (
    <div className={clsx('flex items-center gap-2 text-white text-xs font-medium', className)}>
      <span className="font-semibold">{data.symbol}:</span>
      <span className="font-bold">{data.price}</span>
      <span
        className={clsx(
          'flex items-center gap-0.5 font-bold',
          isPositive ? 'text-green-300' : 'text-red-300',
        )}
      >
        {isPositive ? <TrendingUp size={12} /> : null}
        ({data.changePercent})
      </span>
      <span className="text-white/70 text-[10px] ml-1">{data.exchange}</span>
    </div>
  );
}
