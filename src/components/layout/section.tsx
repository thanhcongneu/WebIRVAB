'use client';

import React from 'react';
import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'surface' | 'surface-low' | 'surface-container' | 'navy-deep' | 'white' | 'transparent';
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

export function Section({
  children,
  className,
  background = 'surface',
  padding = 'default',
}: SectionProps) {
  const bgClass = {
    surface: 'bg-surface',
    'surface-low': 'bg-surface-container-low',
    'surface-container': 'bg-surface-container',
    'navy-deep': 'bg-navy-deep text-white',
    white: 'bg-white',
    transparent: '',
  };

  const paddingClass = {
    none: '',
    sm: 'py-8',
    default: 'py-20',
    lg: 'py-32',
  };

  return (
    <section
      className={clsx(bgClass[background], paddingClass[padding], className)}
    >
      <div className="max-w-container-max mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}

// Content wrapper for pages
interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <div className={clsx('max-w-container-max mx-auto px-4 md:px-6 py-8', className)}>
      {children}
    </div>
  );
}
