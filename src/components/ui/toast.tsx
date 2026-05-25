'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import clsx from 'clsx';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} className="text-success-600" />,
  error: <XCircle size={18} className="text-danger-600" />,
  warning: <AlertTriangle size={18} className="text-warning-600" />,
  info: <Info size={18} className="text-info-600" />,
};

const toastBorderMap: Record<ToastType, string> = {
  success: 'border-l-success-600',
  error: 'border-l-danger-600',
  warning: 'border-l-warning-500',
  info: 'border-l-info-500',
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  return (
    <div
      className={clsx(
        'toast animate-fadeInLeft border-l-4',
        toastBorderMap[toast.type],
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{iconMap[toast.type]}</div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-on-surface">{toast.title}</p>
        )}
        <p className="text-xs text-on-surface-variant">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const newToast: Toast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss (not for error)
      if (toast.type !== 'error') {
        const duration = toast.duration ?? (toast.type === 'warning' ? 5000 : toast.type === 'info' ? 4000 : 3000);
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div
        className="fixed top-4 right-4 z-toast flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Standalone toast display (for use outside provider)
interface ToastDisplayProps {
  toast: Toast;
  onDismiss: () => void;
}

export function ToastDisplay({ toast, onDismiss }: ToastDisplayProps) {
  return <ToastItem toast={toast} onRemove={onDismiss} />;
}
