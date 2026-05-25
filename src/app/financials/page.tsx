'use client';

import { useState } from 'react';
import { Download, TrendingUp, TrendingDown, Minus, FileText, BarChart3 } from 'lucide-react';
import { kpiMetrics, quarterlyResults } from '@/data/ir-data';
import Link from 'next/link';

export default function FinancialsPage() {
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filtered = selectedYear === 'all'
    ? quarterlyResults
    : quarterlyResults.filter(r => String(r.year) === selectedYear);

  const years = [...new Set(quarterlyResults.map(r => r.year))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Thông Tin Tài Chính</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Dữ liệu tài chính chuẩn hóa phục vụ phân tích và định giá</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* KPI Cards */}
        <div className="mb-10">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-4">Chỉ Số Tài Chính Chính</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiMetrics.map((kpi) => {
              const Icon = kpi.changeType === 'positive' ? TrendingUp : kpi.changeType === 'negative' ? TrendingDown : Minus;
              return (
                <div key={kpi.id} className="card p-4 flex flex-col gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">{kpi.name}</span>
                  <div className="font-headline text-xl font-bold text-vab-primary">{kpi.value}</div>
                  <div className={`text-[10px] font-medium flex items-center gap-1 ${kpi.changeType === 'positive' ? 'text-success' : kpi.changeType === 'negative' ? 'text-gray-500' : 'text-info'}`}>
                    <Icon size={12} />
                    {kpi.change}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Download Pack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { title: 'Press Release Q3/2025', label: 'Báo Cáo Báo Chí', icon: FileText },
            { title: 'Presentation Q3/2025', label: 'Bài Trình Bày KQKD', icon: BarChart3 },
            { title: 'Data Pack Q3/2025', label: 'Bộ Dữ Liệu (Excel)', icon: Download },
          ].map((item, i) => (
            <Link
              key={i}
              href="#"
              className="card card-hover p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <item.icon className="text-vab-primary" size={22} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-on-surface group-hover:text-vab-primary transition-colors">{item.title}</p>
                <p className="text-xs text-on-surface-variant">{item.label}</p>
              </div>
              <Download size={16} className="text-gray-400 group-hover:text-vab-primary transition-colors" />
            </Link>
          ))}
        </div>

        {/* Historical Results Table */}
        <div className="card overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-headline text-lg font-bold text-vab-primary">Kết Quả Lịch Sử</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="form-input form-input-sm text-sm w-auto"
              >
                <option value="all">Tất cả năm</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <button className="btn btn-primary btn-sm">
                <Download size={14} /> Excel
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-vab-primary text-white">
                  {['Kỳ', 'Tổng Tài Sản (Tỷ)', 'Lợi Nhuận Sau Thuế (Tỷ)', 'NIM (%)', 'NPL (%)', 'CAR (%)'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row) => (
                  <tr key={`${row.quarter}-${row.year}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-vab-primary">{row.quarter}/{row.year}</td>
                    <td className="px-4 py-3 text-sm">{row.totalAssets}</td>
                    <td className="px-4 py-3 text-sm font-medium">{row.netProfit}</td>
                    <td className="px-4 py-3 text-sm">{row.nim}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${parseFloat(row.npl) <= 2 ? 'badge-positive' : 'badge-warning'}`}>
                        {row.npl}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{row.car}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 border-l-4 border-secondary/30 bg-surface-container-lowest rounded-r-lg">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            <strong className="text-secondary">Lưu ý:</strong> Dữ liệu tài chính được trình bày theo chuẩn Báo cáo Tài chính Quốc tế (IFRS) và Thông tư 41/2016/TT-NHNN. Số liệu trên chỉ mang tính tham khảo. Vui lòng xem Báo cáo Tài chính đã được kiểm toán đầy đủ tại mục <Link href="/disclosures?category=annual_report" className="text-vab-primary font-semibold hover:underline">Báo cáo Thường Niên</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
