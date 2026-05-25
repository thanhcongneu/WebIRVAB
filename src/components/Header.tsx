'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Globe, Bell, Download, Menu, X } from 'lucide-react';
import { navLinks } from '@/data/ir-data';
import { stockData } from '@/data/ir-data';
import clsx from 'clsx';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  return (
    <>
      {/* Stock Ticker Bar */}
      <div className="w-full h-8 bg-vab-primary flex items-center px-4 md:px-8 justify-between text-white text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{stockData.symbol}:</span>
          <span className="font-bold">{stockData.price}</span>
          <span className="text-status-positive font-bold">({stockData.changePercent})</span>
          <span className="text-white/70 text-[10px] ml-1">{stockData.exchange}</span>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="hover:opacity-80 flex items-center gap-1 transition-opacity">
            <Bell size={14} />
          </button>
          <button aria-label="Download App" className="hover:opacity-80 flex items-center gap-1 transition-opacity">
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/" className="font-headline text-xl font-bold text-vab-primary hover:text-primary transition-colors">
              VietABank IR
            </Link>
            <nav className="hidden lg:flex gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'text-xs font-semibold tracking-wider uppercase transition-colors pb-1 border-b-2',
                    'text-on-surface-variant border-transparent hover:text-vab-primary hover:border-vab-primary/50'
                  )}
                >
                  {lang === 'vi' ? link.label : link.labelEn}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="text-on-surface-variant hover:bg-surface-container-low transition-all p-2 rounded-md"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setLang(l => l === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1 text-on-surface-variant hover:bg-surface-container-low transition-all p-2 rounded-md text-xs font-semibold tracking-wider uppercase"
            >
              <Globe size={16} />
              <span className="hidden md:inline">{lang.toUpperCase()}</span>
            </button>
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-low transition-all p-2 rounded-md"
            >
              CMS
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="lg:hidden text-on-surface-variant hover:bg-surface-container-low transition-all p-2 rounded-md"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-outline-variant bg-surface-container-lowest">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low border-b border-outline-variant/50 transition-colors"
              >
                {lang === 'vi' ? link.label : link.labelEn}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-sm font-semibold text-vab-primary border-b border-outline-variant/50"
            >
              CMS Admin
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
