'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import type { Disclosure } from '@/types';
import type { DisclosureCategory } from '@/types';

interface DisclosureCardProps {
  disclosure: Disclosure;
  variant?: 'card' | 'list';
  categoryLabels?: Partial<Record<DisclosureCategory, { vi: string; en: string }>>;
  className?: string;
}

export function DisclosureCard({
  disclosure,
  variant = 'card',
  categoryLabels = {},
  className,
}: DisclosureCardProps) {
  const categoryLabel = categoryLabels[disclosure.category]?.vi || disclosure.category;

  if (variant === 'list') {
    return (
      <div className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
        <div className="flex items-center gap-3">
          <FileText className="text-vab-primary flex-shrink-0" size={18} />
          <div>
            <p className="text-sm font-medium text-on-surface">{disclosure.title}</p>
            <p className="text-xs text-on-surface-variant">{disclosure.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden md:block">{disclosure.publishDate}</span>
          <a
            href={disclosure.pdfUrl}
            className="flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors"
          >
            <Download size={12} /> PDF
          </a>
        </div>
      </div>
    );
  }

  // Card variant
  return (
    <Link
      href={`/disclosures?id=${disclosure.id}`}
      className="card card-hover p-6 flex gap-4 group"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
        <FileText className="text-vab-primary" size={22} />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-primary-100 text-vab-primary px-2 py-0.5 rounded-full">
            {categoryLabel}
          </span>
          {disclosure.regulator && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {disclosure.regulator}
            </span>
          )}
        </div>
        <h3 className="font-headline text-base font-semibold text-on-surface hover:text-vab-primary transition-colors line-clamp-2">
          {disclosure.title}
        </h3>
        <p className="text-xs text-on-surface-variant line-clamp-2">{disclosure.summary}</p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-[10px] text-gray-500 font-medium">{disclosure.publishDate}</span>
          <div className="flex items-center gap-1 text-data-blue text-[10px] font-semibold uppercase tracking-wider">
            <Download size={12} />
            PDF
          </div>
        </div>
      </div>
    </Link>
  );
}
