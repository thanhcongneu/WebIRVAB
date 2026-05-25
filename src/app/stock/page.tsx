'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Download, BarChart2 } from 'lucide-react';
import { stockData } from '@/data/ir-data';
import Link from 'next/link';

const timeframes = ['1M', '3M', '6M', 'YTD', '1Y', '3Y', '5Y'];

export default function StockPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [chartTab, setChartTab] = useState<'price' | 'volume'>('price');

  const mockChartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    price: 14000 + Math.random() * 4000 + (i * 30),
    volume: Math.floor(Math.random() * 5000000) + 500000,
  }));

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">HOSE</span>
            <span className="font-headline text-3xl font-bold">{stockData.symbol}</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Thông Tin Cổ Phiếu</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Dữ liệu thị trường và lịch sử giao dịch</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Price Widget */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-outline mb-1">Giá Hiện Tại</p>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-5xl font-bold text-vab-primary">{stockData.price}</span>
                <span className="text-sm text-outline">VND</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`flex items-center gap-1 text-sm font-bold ${parseFloat(stockData.change) >= 0 ? 'text-status-positive' : 'text-secondary'}`}>
                  {parseFloat(stockData.change) >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stockData.change} ({stockData.changePercent})
                </span>
                <span className="text-xs text-outline">Hôm nay</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'Khối Lượng', value: stockData.volume },
                { label: 'Vốn Hóa (Tỷ)', value: stockData.marketCap },
                { label: 'Cao 52W', value: stockData.high52w },
                { label: 'Thấp 52W', value: stockData.low52w },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1">{item.label}</p>
                  <p className="font-headline text-lg font-bold text-on-surface">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-1">
              {timeframes.map(tf => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${selectedTimeframe === tf ? 'bg-vab-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {(['price', 'volume'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setChartTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${chartTab === tab ? 'bg-vab-primary/10 text-vab-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                >
                  {tab === 'price' ? 'Giá' : 'KL'}
                </button>
              ))}
            </div>
          </div>

          {/* Simple SVG Chart */}
          <div className="relative h-64 w-full">
            <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#e2e2e8" strokeWidth="1" />
              ))}
              {/* Price area */}
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 180 ${mockChartData.map((d, i) => `L ${(i / mockChartData.length) * 800} ${180 - ((d.price - 14000) / 4000) * 180}`).join(' ')} L 800 180 Z`}
                fill="url(#priceGradient)"
              />
              <path
                d={`M 0 180 ${mockChartData.map((d, i) => `L ${(i / mockChartData.length) * 800} ${180 - ((d.price - 14000) / 4000) * 180}`).join(' ')}`}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Ownership & Dividend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Cơ Cấu Cổ Đông</h3>
            <div className="space-y-3">
              {[
                { label: 'Cổ đông lớn (>5%)', value: 42, color: 'bg-vab-primary' },
                { label: 'Nhà đầu tư tổ chức', value: 31, color: 'bg-data-blue' },
                { label: 'Nhà đầu tư cá nhân', value: 27, color: 'bg-status-positive' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-sm text-on-surface-variant w-44">{item.label}</span>
                  <div className="flex-1 bg-surface-container-high rounded-full h-3">
                    <div className={`${item.color} h-3 rounded-full`} style={{ width: `${item.value}%` }} />
                  </div>
                  <span className="text-sm font-bold text-on-surface w-12 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Lịch Sử Cổ Tức</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-outline pb-2">Năm</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-outline pb-2">Cổ tức</th>
                    <th className="text-left text-[10px] font-bold uppercase tracking-wider text-outline pb-2">Tỷ lệ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {[
                    { year: 2024, div: '1,200 VND/cp', rate: '8.0%' },
                    { year: 2023, div: '1,000 VND/cp', rate: '7.5%' },
                    { year: 2022, div: '900 VND/cp', rate: '7.0%' },
                    { year: 2021, div: '800 VND/cp', rate: '6.5%' },
                  ].map(row => (
                    <tr key={row.year}>
                      <td className="py-2 text-sm">{row.year}</td>
                      <td className="py-2 text-sm font-medium">{row.div}</td>
                      <td className="py-2 text-sm text-status-positive">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="flex gap-4 flex-wrap">
          <button className="flex items-center gap-2 px-5 py-3 bg-vab-primary text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-vab-primary-container transition-colors">
            <Download size={16} /> CSV Dữ Liệu Giá
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-outline text-on-surface-variant text-sm font-bold uppercase tracking-wider rounded hover:border-vab-primary hover:text-vab-primary transition-colors">
            <BarChart2 size={16} /> Bộ Công Cụ Định Giá
          </button>
          <Link href="/disclosures?category=quarterly_results" className="flex items-center gap-2 px-5 py-3 border border-outline text-on-surface-variant text-sm font-bold uppercase tracking-wider rounded hover:border-vab-primary hover:text-vab-primary transition-colors">
            <TrendingUp size={16} /> Báo Cáo KQKD
          </Link>
        </div>
      </div>
    </div>
  );
}
