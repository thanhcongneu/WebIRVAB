'use client';

import React from 'react';
import clsx from 'clsx';
import { Download } from 'lucide-react';
import { Button } from './button';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
  // Pagination
  page?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  // Export
  showExport?: boolean;
  onExport?: () => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  emptyMessage = 'Không có dữ liệu.',
  emptyIcon,
  onRowClick,
  className,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  showExport = false,
  onExport,
}: DataTableProps<T>) {
  const tableClasses = clsx(
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    compact && 'table-compact',
  );

  const alignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-lg">
        <table className={tableClasses}>
          <thead>
            <tr className="bg-vab-primary text-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    alignClass(col.align),
                    col.className,
                  )}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-gray-400"
                >
                  <div className="flex flex-col items-center gap-3">
                    {emptyIcon && <div className="opacity-30">{emptyIcon}</div>}
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={keyExtractor(row)}
                  className={clsx(
                    hoverable && 'hover:bg-gray-50',
                    onRowClick && 'cursor-pointer',
                    'transition-colors',
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx(alignClass(col.align), col.className)}
                    >
                      {col.render
                        ? col.render(row, index)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages !== undefined && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-xs text-gray-400">
            {totalCount !== undefined && pageSize !== undefined && page !== undefined
              ? `Hiển thị ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalCount)} trong ${totalCount}`
              : ''}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page === 1}
              onClick={() => onPageChange?.(page! - 1)}
            >
              ←
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page!) <= 2)
              .map((p, i, arr) => (
                <React.Fragment key={p}>
                  {i > 0 && arr[i - 1] !== p - 1 && (
                    <span className="text-gray-400 px-1">…</span>
                  )}
                  <Button
                    variant={page === p ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange?.(p)}
                  >
                    {p}
                  </Button>
                </React.Fragment>
              ))}
            <Button
              variant="ghost"
              size="sm"
              disabled={page === totalPages}
              onClick={() => onPageChange?.(page! + 1)}
            >
              →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact export button for table headers
interface TableExportProps {
  onExport: () => void;
  label?: string;
}

export function TableExport({ onExport, label = 'Excel' }: TableExportProps) {
  return (
    <Button variant="primary" size="sm" icon={<Download size={14} />} onClick={onExport}>
      {label}
    </Button>
  );
}
