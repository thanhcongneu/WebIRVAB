'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';
import type { KPIMetric } from '@/types';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  period?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({
  label,
  value,
  unit,
  change,
  changeType = 'neutral',
  period,
  icon,
  className,
  onClick,
}: MetricCardProps) {
  const TrendIcon =
    changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  const changeColorClass =
    changeType === 'positive'
      ? 'text-success-600'
      : changeType === 'negative'
      ? 'text-gray-500'
      : 'text-info-600';

  const changeBadgeClass =
    changeType === 'positive'
      ? 'badge-success'
      : changeType === 'negative'
      ? 'badge-danger'
      : 'badge-info';

  return (
    <div
      className={clsx(
        'card p-4 flex flex-col gap-3',
        onClick && 'card-interactive cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          {label}
        </span>
        {icon && <span className="text-vab-primary">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-headline text-2xl font-bold text-vab-primary">{value}</span>
        {unit && <span className="text-xs text-gray-400">{unit}</span>}
      </div>
      <div className="flex items-center justify-between">
        <span
          className={clsx(
            'text-[10px] font-medium flex items-center gap-1',
            changeColorClass,
          )}
        >
          <TrendIcon size={12} />
          {change}
        </span>
        {period && (
          <span className="text-[10px] text-gray-400">{period}</span>
        )}
      </div>
    </div>
  );
}

// KPI Grid wrapper for consistent layout
interface KPIGridProps {
  metrics: KPIMetric[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
  onMetricClick?: (metric: KPIMetric) => void;
}

export function KPIGrid({ metrics, columns = 6, className, onMetricClick }: KPIGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-6',
  };

  return (
    <div className={clsx('grid', gridCols[columns], 'gap-4', className)}>
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          label={metric.name}
          value={metric.value}
          unit={metric.unit}
          change={metric.change}
          changeType={metric.changeType}
          period={metric.period}
          onClick={onMetricClick ? () => onMetricClick(metric) : undefined}
        />
      ))}
    </div>
  );
}
