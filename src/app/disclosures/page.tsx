'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Download, FileText, X } from 'lucide-react';
import { disclosures, categoryLabels } from '@/data/ir-data';
import type { DisclosureCategory, DisclosureLanguage } from '@/types';

export default function DisclosuresPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DisclosureCategory | 'all'>('all');
  const [year, setYear] = useState<string>('all');
  const [lang, setLang] = useState<DisclosureLanguage | 'all'>('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return disclosures.filter(d => {
      const matchSearch = search === '' ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.summary.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || d.category === category;
      const matchYear = year === 'all' || String(d.year) === year;
      const matchLang = lang === 'all' || d.language === lang || d.language === 'both';
      return matchSearch && matchCategory && matchYear && matchLang;
    });
  }, [search, category, year, lang]);

  const years = [...new Set(disclosures.map(d => d.year))].sort((a, b) => b - a);

  const activeFilters = [
    category !== 'all' && { key: 'category', label: categoryLabels[category]?.vi || category },
    year !== 'all' && { key: 'year', label: year },
    lang !== 'all' && { key: 'lang', label: lang === 'vi' ? 'Tiếng Việt' : 'English' },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Trung Tâm Công Bố Thông Tin</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Tìm kiếm và tải về tất cả công bố thông tin chính thức của VietABank</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Search & Filter Bar */}
        <div className="card p-4 mb-6">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Tìm kiếm công bố..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`btn ${filterOpen ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Filter size={14} />
              Bộ lọc
              {activeFilters.length > 0 && (
                <span className="bg-white text-vab-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="form-group mb-0">
                <label className="form-label text-[10px] uppercase tracking-wider text-gray-500">Loại công bố</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as DisclosureCategory | 'all')}
                  className="form-input"
                >
                  <option value="all">Tất cả</option>
                  {Object.entries(categoryLabels).map(([key, val]) => (
                    <option key={key} value={key}>{val.vi}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label text-[10px] uppercase tracking-wider text-gray-500">Năm</label>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="form-input"
                >
                  <option value="all">Tất cả</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label text-[10px] uppercase tracking-wider text-gray-500">Ngôn ngữ</label>
                <select
                  value={lang}
                  onChange={e => setLang(e.target.value as DisclosureLanguage | 'all')}
                  className="form-input"
                >
                  <option value="all">Tất cả</option>
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                  <option value="both">Song ngữ</option>
                </select>
              </div>
            </div>
          )}

          {/* Active Filters Tags */}
          {activeFilters.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {activeFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => {
                    if (f.key === 'category') setCategory('all');
                    if (f.key === 'year') setYear('all');
                    if (f.key === 'lang') setLang('all');
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-primary-100 text-vab-primary px-2 py-1 rounded-full hover:bg-primary-200 transition-colors"
                >
                  {f.label} <X size={10} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-on-surface-variant">
            Hiển thị <span className="font-bold text-vab-primary">{filtered.length}</span> kết quả
          </p>
        </div>

        {/* Disclosure List */}
        <div className="card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p>Không tìm thấy công bố nào phù hợp.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr className="bg-vab-primary text-white">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider w-12">#</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Tiêu đề</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider hidden md:table-cell">Loại</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider hidden md:table-cell">Năm</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Ngày</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider w-20">Tải</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((d, i) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-semibold uppercase tracking-wider bg-primary-100 text-vab-primary px-1.5 py-0.5 rounded">
                          {categoryLabels[d.category]?.vi || d.category}
                        </span>
                        {d.regulator && (
                          <span className="text-[9px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                            {d.regulator}
                          </span>
                        )}
                      </div>
                      <a href={`/disclosures?id=${d.id}`} className="text-sm font-medium text-on-surface hover:text-vab-primary transition-colors cursor-pointer">{d.title}</a>
                      <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{d.summary}</p>
                    </td>
                    <td className="px-4 py-4 text-xs text-on-surface-variant hidden md:table-cell">
                      {categoryLabels[d.category]?.vi || d.category}
                    </td>
                    <td className="px-4 py-4 text-xs text-on-surface-variant hidden md:table-cell">{d.year}</td>
                    <td className="px-4 py-4 text-xs text-on-surface-variant">{d.publishDate}</td>
                    <td className="px-4 py-4">
                      <a
                        href={d.pdfUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors"
                      >
                        <Download size={12} />
                        PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
