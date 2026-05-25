'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ExternalLink, Video } from 'lucide-react';
import type { Event } from '@/types';
import clsx from 'clsx';

interface EventCardProps {
  event: Event;
  variant?: 'card' | 'compact';
  className?: string;
}

const eventTypeConfig: Record<string, { color: string; label: string }> = {
  earnings: { color: 'bg-primary-100 text-vab-primary', label: 'Kết quả kinh doanh' },
  agm: { color: 'bg-gray-100 text-gray-600', label: 'ĐHĐCĐ' },
  investor_day: { color: 'bg-warning-100 text-warning-700', label: 'Ngày NĐT' },
  webcast: { color: 'bg-info-100 text-info-700', label: 'Webcast' },
  conference: { color: 'bg-success-100 text-success-700', label: 'Hội nghị' },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  upcoming: { color: 'bg-warning-100 text-warning-700', label: 'Sắp tới' },
  live: { color: 'bg-success-100 text-success-700', label: 'Đang diễn ra' },
  past: { color: 'bg-gray-100 text-gray-500', label: 'Đã diễn ra' },
};

export function EventCard({ event, variant = 'card', className }: EventCardProps) {
  const type = eventTypeConfig[event.type] ?? { color: 'bg-gray-100 text-gray-600', label: event.type };
  const status = statusConfig[event.status] ?? { color: 'bg-gray-100 text-gray-500', label: event.status };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex-shrink-0 text-center w-16">
          <p className="text-xs font-semibold text-vab-primary">{event.date}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-on-surface">{event.title}</p>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${status.color}`}>
          {status.label}
        </span>
      </div>
    );
  }

  return (
    <div className={clsx('card p-6 flex flex-col gap-3 hover:shadow-md transition-shadow', className)}>
      <div className="flex items-center gap-2">
        <Calendar className="text-vab-primary" size={18} />
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${type.color}`}>
          {type.label}
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${status.color}`}>
          {status.label}
        </span>
      </div>
      <h3 className="font-headline text-lg font-semibold text-on-surface">{event.title}</h3>
      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
        <span>{event.date}</span>
      </div>
      {event.replayUrl && (
        <Link
          href={event.replayUrl}
          className="inline-flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors mt-2"
        >
          <ExternalLink size={12} />
          Xem lại
        </Link>
      )}
    </div>
  );
}

// Archive row for past events table
interface EventArchiveRowProps {
  event: Event;
  typeLabel: string;
}

export function EventArchiveRow({ event, typeLabel }: EventArchiveRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4">
        <p className="text-sm font-medium text-on-surface">{event.title}</p>
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {typeLabel}
        </span>
      </td>
      <td className="px-4 py-4 text-xs text-on-surface-variant">{event.date}</td>
      <td className="px-4 py-4">
        {event.replayUrl ? (
          <a
            href={event.replayUrl}
            className="inline-flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors"
          >
            <ExternalLink size={12} />
            Xem lại
          </a>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
    </tr>
  );
}
