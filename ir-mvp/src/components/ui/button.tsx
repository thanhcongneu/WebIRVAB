'use client';

import React from 'react';
import clsx from 'clsx';

// Button variants — align with VietABank Design System
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  success: 'btn-success',
  warning: 'btn-warning',
  link: 'btn-link',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        'btn',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        loading && 'btn-loading',
        className,
      )}
    >
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}

// Icon-only button variant
interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'iconRight' | 'children'> {
  label: string; // for aria-label
  children: React.ReactNode;
}

export function IconButton({
  label,
  children,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className={clsx('btn-icon', size === 'sm' ? 'btn-icon btn-sm' : '', className)}
      aria-label={label}
    >
      {children}
    </Button>
  );
}
