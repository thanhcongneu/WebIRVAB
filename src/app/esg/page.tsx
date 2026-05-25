'use client';

import Link from 'next/link';
import { Leaf, Users, Shield, Download, CheckCircle } from 'lucide-react';
import { esgMetrics } from '@/data/ir-data';

export default function ESgPage() {
  const envMetrics = esgMetrics.filter(m => m.category === 'Môi Trường');
  const socialMetrics = esgMetrics.filter(m => m.category === 'Xã Hội');
  const govMetrics = esgMetrics.filter(m => m.category === 'Quản Trị');

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="text-success-600" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider text-success-600">Bền Vững</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">ESG & Phát Triển Bền Vững</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Cam kết phát triển bền vững theo tiêu chuẩn quốc tế GRI, TCFD, ISSB IFRS S1/S2</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* ESG Rating Banner */}
        <div className="bg-gradient-to-r from-vab-primary to-vab-primary-container text-white rounded-xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-vab-primary-fixed-dim mb-2">Điểm Xếp Hạng ESG 2024</p>
            <div className="flex items-center gap-4">
              <span className="font-headline text-6xl font-bold">A-</span>
              <div>
                <p className="font-headline text-xl font-bold">Xếp hạng cao</p>
                <p className="text-sm text-vab-primary-fixed-dim">Top 20% ngành ngân hàng Việt Nam</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: 'Môi trường', score: 'A' },
              { label: 'Xã hội', score: 'B+' },
              { label: 'Quản trị', score: 'A' },
            ].map(item => (
              <div key={item.label} className="bg-white/10 rounded-lg px-4 py-3">
                <p className="font-headline text-2xl font-bold">{item.score}</p>
                <p className="text-[10px] uppercase tracking-wider text-vab-primary-fixed-dim">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Frameworks */}
        <div className="mb-10">
          <h2 className="font-headline text-xl font-bold text-vab-primary mb-4">Khung Tiêu Chuẩn Được Áp Dụng</h2>
          <div className="flex flex-wrap gap-3">
            {['GRI', 'TCFD', 'ISSB IFRS S1/S2', 'SASB', 'PCAF', 'Equator Principles', 'UN SDGs', 'PRI'].map(fw => (
              <span key={fw} className="px-4 py-2 bg-vab-primary/10 text-vab-primary text-xs font-bold uppercase tracking-wider rounded-full">
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Environmental */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Leaf className="text-success-600" size={24} />
            Môi Trường
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {envMetrics.map((m, i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">{m.metric}</p>
                <p className="font-headline text-3xl font-bold text-success-600 mb-1">{m.value}</p>
                <p className="text-xs text-gray-400">{m.year}</p>
              </div>
            ))}
          </div>
          {/* Green Finance Progress */}
          <div className="mt-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Danh Mục Tài Chính Xanh</h3>
            <div className="space-y-4">
              {[
                { label: 'Năng lượng tái tạo', value: 42, color: 'bg-success-600' },
                { label: 'Giao thông xanh', value: 28, color: 'bg-data-blue' },
                { label: 'Nông nghiệp bền vững', value: 18, color: 'bg-vab-primary' },
                { label: 'Xây dựng xanh', value: 12, color: 'bg-warning-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-sm text-on-surface-variant w-48">{item.label}</span>
                  <div className="flex-1 bg-surface-container-high rounded-full h-4">
                    <div className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`} style={{ width: `${item.value}%` }}>
                      <span className="text-[10px] font-bold text-white">{item.value}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Users className="text-data-blue" size={24} />
            Xã Hội
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialMetrics.map((m, i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">{m.metric}</p>
                <p className="font-headline text-3xl font-bold text-data-blue mb-1">{m.value}</p>
                <p className="text-xs text-gray-400">{m.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Governance */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-2xl font-bold text-vab-primary flex items-center gap-2">
              <Shield className="text-vab-primary" size={24} />
              Quản Trị
            </h2>
            <Link href="/governance" className="text-xs font-bold uppercase tracking-wider text-vab-primary hover:underline">
              Xem Quản Trị Công Ty →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {govMetrics.map((m, i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">{m.metric}</p>
                <p className="font-headline text-3xl font-bold text-vab-primary mb-1">{m.value}</p>
                <p className="text-xs text-gray-400">{m.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <div className="flex gap-4 flex-wrap">
          <button className="flex items-center gap-2 px-5 py-3 bg-vab-primary text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-vab-primary-container transition-colors">
            <Download size={16} /> Báo Cáo ESG 2024
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-outline text-on-surface-variant text-sm font-bold uppercase tracking-wider rounded hover:border-vab-primary hover:text-vab-primary transition-colors">
            <Download size={16} /> Data Book ESG
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-outline text-on-surface-variant text-sm font-bold uppercase tracking-wider rounded hover:border-vab-primary hover:text-vab-primary transition-colors">
            <Download size={16} /> Chính sách Khí hậu
          </button>
        </div>
      </div>
    </div>
  );
}
