'use client';

import React from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  debounceMs?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className,
  loading = false,
  disabled = false,
  size = 'md',
}: SearchBarProps) {
  const sizeClasses = {
    sm: 'form-input-sm',
    md: '',
    lg: 'form-input-lg',
  };

  return (
    <div className={clsx('relative', className)}>
      <div className="form-input-wrapper">
        {loading ? (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="spinner spinner-sm" />
          </div>
        ) : (
          <Search className="input-icon" size={16} />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={clsx(
            'form-input',
            sizeClasses[size],
            'pr-10',
          )}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            disabled={disabled || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// Filterable search bar with active filter tags
interface FilterableSearchProps extends SearchBarProps {
  activeFilters?: { key: string; label: string }[];
  onRemoveFilter?: (key: string) => void;
}

export function FilterableSearch({
  activeFilters = [],
  onRemoveFilter,
  ...props
}: FilterableSearchProps) {
  return (
    <div>
      <SearchBar {...props} />
      {activeFilters.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => onRemoveFilter?.(f.key)}
              className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-primary-100 text-vab-primary px-2 py-1 rounded-full hover:bg-primary-200 transition-colors"
            >
              {f.label} <X size={10} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
