'use client';

import React from 'react';
import type { BoardMember } from '@/types';
import clsx from 'clsx';

interface BoardMemberCardProps {
  member: BoardMember;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: 'list' | 'detail';
  className?: string;
}

export function BoardMemberCard({
  member,
  isSelected = false,
  onClick,
  variant = 'list',
  className,
}: BoardMemberCardProps) {
  if (variant === 'detail') {
    return (
      <div className={clsx('card p-6', className)}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-headline text-xl font-bold text-vab-primary">
              {member.name.split(' ').slice(-1)[0][0]}
            </span>
          </div>
          <div>
            <h3 className="font-headline text-xl font-bold text-on-surface">{member.name}</h3>
            <p className="text-sm text-vab-primary font-medium">{member.position}</p>
          </div>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed">{member.bio}</p>
      </div>
    );
  }

  // List variant (for sidebar list)
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'w-full text-left px-4 py-3 border-b border-gray-100 transition-colors',
        isSelected ? 'bg-primary-50' : 'hover:bg-gray-50',
        className,
      )}
    >
      <p className="text-sm font-semibold text-on-surface">{member.name}</p>
      <p className="text-xs text-on-surface-variant">{member.position}</p>
    </button>
  );
}

// Board member avatar (circular initial)
interface MemberAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MemberAvatar({ name, size = 'md', className }: MemberAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  const initials = name
    .split(' ')
    .slice(-2)
    .map((n) => n[0])
    .join('');

  return (
    <div
      className={clsx(
        'bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        className,
      )}
    >
      <span className="font-headline font-bold text-vab-primary">{initials}</span>
    </div>
  );
}
