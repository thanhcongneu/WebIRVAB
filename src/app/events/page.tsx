'use client';

import Link from 'next/link';
import { Calendar, ExternalLink, Video } from 'lucide-react';
import { events } from '@/data/ir-data';

export default function EventsPage() {
  const upcoming = events.filter(e => e.status !== 'past');
  const past = events.filter(e => e.status === 'past');

  const eventTypeLabels: Record<string, { vi: string; en: string; color: string }> = {
    earnings: { vi: 'Kết quả kinh doanh', en: 'Earnings Call', color: 'bg-primary-100 text-vab-primary' },
    agm: { vi: 'ĐHĐCĐ', en: 'AGM', color: 'bg-gray-100 text-gray-600' },
    investor_day: { vi: 'Ngày NĐT', en: 'Investor Day', color: 'bg-warning-100 text-warning-700' },
    webcast: { vi: 'Webcast', en: 'Webcast', color: 'bg-info-100 text-info-700' },
    conference: { vi: 'Hội nghị', en: 'Conference', color: 'bg-success-100 text-success-700' },
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Sự Kiện & Lịch IR</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Những sự kiện quan trọng dành cho nhà đầu tư</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Calendar className="text-vab-primary" size={24} />
            Sự Kiện Sắp Tới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map(event => {
              const et = eventTypeLabels[event.type];
              return (
                <div key={event.id} className="card p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${et.color}`}>
                      {et.vi}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-warning-100 text-warning-700 px-2 py-0.5 rounded-full">
                      Sắp tới
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-on-surface mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {event.date}
                    </span>
                  </div>
                  <button className="btn btn-primary">
                    Đăng Ký Tham Dự
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Video className="text-gray-400" size={24} />
            Lưu Trữ Sự Kiện
          </h2>
          <div className="card overflow-hidden">
            <table className="table">
              <thead>
                <tr className="bg-vab-primary text-white">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Sự kiện</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider hidden md:table-cell">Loại</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Ngày</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider w-24">Tài liệu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {past.map(event => {
                  const et = eventTypeLabels[event.type];
                  return (
                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-on-surface">{event.title}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${et.color}`}>
                          {et.vi}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-on-surface-variant">{event.date}</td>
                      <td className="px-4 py-4">
                        {event.replayUrl ? (
                          <a href={event.replayUrl} className="inline-flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors">
                            <ExternalLink size={12} /> Xem lại
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Financial Calendar */}
        <section className="mt-12 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline text-lg font-bold text-vab-primary flex items-center gap-2">
              <Calendar className="text-vab-primary" size={20} />
              Lịch Tài Chính 2025
            </h3>
            <Link href="/agm" className="text-xs font-semibold uppercase tracking-wider text-vab-primary hover:underline">
              Trung Tâm Cổ Đông →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { date: '25/04/2025', event: 'ĐHĐCĐ Thường Niên 2025', status: 'Đã diễn ra', statusColor: 'bg-success-100 text-success-700' },
              { date: '28/04/2025', event: 'Công bố Báo cáo Tài chính Quý 1/2025', status: 'Đã hoàn thành', statusColor: 'bg-success-100 text-success-700' },
              { date: '25/07/2025', event: 'Công bố Báo cáo Tài chính Quý 2/2025', status: 'Đã hoàn thành', statusColor: 'bg-success-100 text-success-700' },
              { date: '28/10/2025', event: 'Công bố Báo cáo Tài chính Quý 3/2025', status: 'Đã hoàn thành', statusColor: 'bg-success-100 text-success-700' },
              { date: '10/12/2025', event: 'Ngày Nhà Đầu Tư 2025', status: 'Sắp tới', statusColor: 'bg-warning-100 text-warning-700' },
              { date: '31/01/2026', event: 'Công bố Báo cáo Tài chính Quý 4/2025 (Audenited)', status: 'Sắp tới', statusColor: 'bg-warning-100 text-warning-700' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 text-center w-16">
                  <p className="text-xs font-semibold text-vab-primary">{item.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-on-surface">{item.event}</p>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
