'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    icon?: React.ReactNode;
    label: string;
    color?: string;
  };
  breadcrumb?: Breadcrumb[];
  action?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'centered' | 'compact';
}

export function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumb,
  action,
  className,
  variant = 'default',
}: PageHeaderProps) {
  return (
    <section
      className={clsx(
        'bg-navy-deep text-white py-12',
        variant === 'centered' && 'text-center',
        className,
      )}
    >
      <div className="max-w-container-max mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-vab-primary-fixed-dim mb-4" aria-label="Breadcrumb">
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="opacity-50">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="flex items-center gap-2 mb-3">
            {badge.icon && <span className={badge.color}>{badge.icon}</span>}
            <span
              className={clsx(
                'text-xs font-bold uppercase tracking-wider',
                badge.color ?? 'text-vab-primary-fixed-dim',
              )}
            >
              {badge.label}
            </span>
          </div>
        )}

        {/* Title & Subtitle */}
        <div className={clsx(variant === 'centered' && 'text-center')}>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-sm text-vab-primary-fixed-dim">{subtitle}</p>
          )}
        </div>

        {/* Action */}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </section>
  );
}

// Page section with title, optional description, and "see all" link
interface PageSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageSection({
  title,
  description,
  icon,
  action,
  children,
  className,
}: PageSectionProps) {
  return (
    <section className={clsx('mb-12', className)}>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline text-2xl font-bold text-vab-primary flex items-center gap-2">
            {icon && <span className="text-vab-primary">{icon}</span>}
            {title}
          </h2>
          {description && (
            <p className="text-sm text-on-surface-variant mt-1">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  );
}

// "See all" link helper
interface SeeAllLinkProps {
  href: string;
  label?: string;
}

export function SeeAllLink({ href, label = 'Xem Tất Cả' }: SeeAllLinkProps) {
  return (
    <Link
      href={href}
      className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-vab-primary hover:text-vab-primary-hover transition-colors"
    >
      {label} <ArrowRight size={14} />
    </Link>
  );
}
