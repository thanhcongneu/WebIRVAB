'use client';

import React from 'react';
import clsx from 'clsx';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'draft'
  | 'open'
  | 'in-progress'
  | 'inprogress'
  | 'on-hold'
  | 'onhold'
  | 'completed'
  | 'accepted'
  | 'revision'
  | 'revision-requested'
  | 'disputed'
  | 'rejected'
  | 'cancelled';

export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean; // Show a status dot before the label
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
  neutral: 'badge-neutral',
  draft: 'badge-draft',
  open: 'badge-open',
  'in-progress': 'badge-in-progress',
  inprogress: 'badge-inprogress',
  'on-hold': 'badge-on-hold',
  onhold: 'badge-onhold',
  completed: 'badge-completed',
  accepted: 'badge-accepted',
  revision: 'badge-revision',
  'revision-requested': 'badge-revision-requested',
  disputed: 'badge-disputed',
  rejected: 'badge-rejected',
  cancelled: 'badge-cancelled',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
};

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'badge',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            'inline-block w-1.5 h-1.5 rounded-full mr-1.5',
            variant === 'success' || variant === 'completed' || variant === 'accepted'
              ? 'bg-success-600'
              : variant === 'warning' || variant === 'in-progress' || variant === 'on-hold'
              ? 'bg-warning-500'
              : variant === 'danger' || variant === 'rejected' || variant === 'disputed' || variant === 'revision'
              ? 'bg-danger-500'
              : variant === 'info' || variant === 'open'
              ? 'bg-info-500'
              : 'bg-gray-400',
          )}
        />
      )}
      {children}
    </span>
  );
}

// Workflow-specific badge with icon support
interface WorkflowBadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  size?: BadgeSize;
  className?: string;
}

export function WorkflowBadge({
  label,
  variant = 'neutral',
  icon,
  size = 'md',
  className,
}: WorkflowBadgeProps) {
  return (
    <Badge variant={variant} size={size} className={clsx('gap-1', className)}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </Badge>
  );
}
