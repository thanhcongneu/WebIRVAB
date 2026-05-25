'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';
import type { StockData } from '@/types';

interface StockWidgetProps {
  data: StockData;
  variant?: 'hero' | 'ticker' | 'compact' | 'full';
  showDetails?: boolean;
  className?: string;
}

export function StockWidget({
  data,
  variant = 'compact',
  showDetails = true,
  className,
}: StockWidgetProps) {
  const isPositive = parseFloat(data.change) >= 0;

  if (variant === 'ticker') {
    return (
      <div className={clsx('flex items-center gap-2 text-white text-xs font-medium', className)}>
        <span className="font-semibold">{data.symbol}:</span>
        <span className="font-bold">{data.price}</span>
        <span className={clsx('font-bold', isPositive ? 'text-green-300' : 'text-red-300')}>
          ({data.changePercent})
        </span>
        <span className="text-white/70 text-[10px] ml-1">{data.exchange}</span>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div
        className={clsx(
          'glass-panel p-8 rounded-xl w-full max-w-sm',
          'bg-white/85 backdrop-blur border border-white/30 shadow-xl',
          className,
        )}
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <span className="font-headline text-xl font-bold text-vab-primary">{data.symbol}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{data.exchange}</span>
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="font-headline text-4xl font-bold text-vab-primary">{data.price}</span>
          <span className="text-xs text-gray-500">VND</span>
        </div>
        <div
          className={clsx(
            'flex items-center gap-1 text-sm font-semibold mt-1',
            isPositive ? 'text-success-600' : 'text-danger-500',
          )}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>
            {data.change} ({data.changePercent})
          </span>
        </div>
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            {[
              { label: 'Khối Lượng', value: data.volume },
              { label: 'Vốn Hóa (Tỷ)', value: data.marketCap },
              { label: 'Cao 52W', value: data.high52w },
              { label: 'Thấp 52W', value: data.low52w },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-on-surface">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={clsx('bg-surface-container-lowest border border-outline-variant rounded-xl p-6', className)}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Giá Hiện Tại</p>
            <div className="flex items-baseline gap-3">
              <span className="font-headline text-5xl font-bold text-vab-primary">{data.price}</span>
              <span className="text-sm text-gray-400">VND</span>
            </div>
            <div
              className={clsx(
                'flex items-center gap-2 mt-2',
                isPositive ? 'text-success-600' : 'text-danger-500',
              )}
            >
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-bold">
                {data.change} ({data.changePercent})
              </span>
              <span className="text-xs text-gray-400">Hôm nay</span>
            </div>
          </div>
          {showDetails && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Khối Lượng', value: data.volume },
                { label: 'Vốn Hóa (Tỷ)', value: data.marketCap },
                { label: 'Cao 52W', value: data.high52w },
                { label: 'Thấp 52W', value: data.low52w },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="font-headline text-lg font-bold text-on-surface">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: compact
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <span className="font-headline text-lg font-bold text-vab-primary">{data.price}</span>
      <span
        className={clsx(
          'flex items-center gap-0.5 text-xs font-semibold',
          isPositive ? 'text-success-600' : 'text-danger-500',
        )}
      >
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {data.changePercent}
      </span>
    </div>
  );
}
