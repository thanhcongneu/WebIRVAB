'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'compact' | 'default' | 'large';
}

export function Card({
  children,
  className,
  hover = false,
  interactive = false,
  padding = 'default',
}: CardProps) {
  return (
    <div
      className={clsx(
        'card',
        hover && 'card-interactive',
        interactive && 'card-interactive',
        padding === 'compact' && 'card-compact',
        padding === 'none' && '',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function CardHeader({ children, className, action }: CardHeaderProps) {
  return (
    <div className={clsx('card-header', className)}>
      {typeof children === 'string' ? <h3 className="card-title">{children}</h3> : children}
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={clsx('card-body', className)}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={clsx('card-footer', className)}>{children}</div>;
}

// Composite Card pattern for easy use
interface CardCompositeProps {
  header?: React.ReactNode;
  headerAction?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function CardComposite({
  header,
  headerAction,
  body,
  footer,
  className,
  hover = false,
}: CardCompositeProps) {
  return (
    <div className={clsx('card', hover && 'card-interactive', className)}>
      {(header || headerAction) && (
        <div className="card-header">
          {header && (typeof header === 'string' ? <h3 className="card-title">{header}</h3> : header)}
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}
      {body && <div className="card-body">{body}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
