import Link from 'next/link';
import { ArrowRight, TrendingUp, Download, Calendar, FileText, ExternalLink } from 'lucide-react';
import { kpiMetrics, disclosures, events, stockData } from '@/data/ir-data';

export default function HomePage() {
  const latestDisclosures = disclosures.slice(0, 4);
  const upcomingEvents = events.filter(e => e.status !== 'past').slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full min-h-[580px] flex items-center justify-center overflow-hidden bg-navy-deep text-white py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#122E5B] via-[#1B4486] to-transparent z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')] bg-cover bg-center opacity-40" />
        </div>
        <div className="relative z-20 max-w-container-max mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Cổ phiếu niêm yết HOSE
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Đầu Tư Vào Sự Xuất Sắc Của Định Chế
            </h1>
            <p className="text-base md:text-lg text-vab-primary-fixed-dim max-w-xl leading-relaxed">
              Ngân hàng thương mại hàng đầu cam kết tăng trưởng bền vững, minh bạch và tạo ra giá trị dài hạn cho cổ đông.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/financials" className="btn btn-primary">
                Báo Cáo Mới Nhất <ArrowRight size={16} />
              </Link>
              <Link href="/disclosures" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
                Công Bố Thông Tin
              </Link>
            </div>
          </div>

          {/* Stock Widget */}
          <div className="hidden lg:flex justify-end">
            <div className="glass-panel p-8 rounded-xl w-80 bg-white/85 backdrop-blur border border-white/30 shadow-xl">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="font-headline text-xl font-bold text-vab-primary">{stockData.symbol}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stockData.exchange}</span>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-headline text-4xl font-bold text-vab-primary">{stockData.price}</span>
                <span className="text-xs text-gray-500">VND</span>
              </div>
              <div className="flex items-center gap-1 text-success text-sm font-semibold mt-1">
                <TrendingUp size={16} />
                <span>{stockData.change} ({stockData.changePercent})</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                {[
                  { label: 'Khối Lượng', value: stockData.volume },
                  { label: 'Vốn Hóa (Tỷ)', value: stockData.marketCap },
                  { label: 'Cao 52W', value: stockData.high52w },
                  { label: 'Thấp 52W', value: stockData.low52w },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-on-surface">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-vab-primary mb-2">Điểm Nhấn Tài Chính</h2>
              <p className="text-sm text-on-surface-variant">Kết quả hoạt động kinh doanh Q3/2025</p>
            </div>
            <Link href="/financials" className="hidden md:flex items-center gap-2 text-data-blue hover:text-vab-primary transition-colors text-xs font-semibold uppercase tracking-wider">
              Xem Báo Cáo Đầy Đủ <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiMetrics.map((kpi, i) => (
              <Link
                key={kpi.id}
                href="/financials"
                className="card card-hover p-5 flex flex-col gap-3 stagger-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">{kpi.name}</span>
                <div className="font-headline text-2xl font-bold text-vab-primary">{kpi.value}</div>
                <div className={`text-xs font-medium px-2 py-1 rounded w-fit ${kpi.changeType === 'positive' ? 'badge-positive' : kpi.changeType === 'negative' ? 'badge-warning' : 'bg-info-100 text-info-700'}`}>
                  {kpi.change}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 md:hidden">
            <Link href="/financials" className="flex items-center gap-2 text-data-blue hover:text-vab-primary transition-colors text-xs font-semibold uppercase tracking-wider">
              Xem Báo Cáo Đầy Đủ <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Disclosures */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-vab-primary mb-2">Công Bố Thông Tin Mới Nhất</h2>
              <p className="text-sm text-on-surface-variant">Cập nhật tuân thủ quy định pháp luật</p>
            </div>
            <Link href="/disclosures" className="hidden md:flex items-center gap-2 text-data-blue hover:text-vab-primary transition-colors text-xs font-semibold uppercase tracking-wider">
              Xem Tất Cả <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestDisclosures.map((d, i) => (
              <Link
                key={d.id}
                href={`/disclosures?id=${d.id}`}
                className="card card-hover p-6 flex gap-4 stagger-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <FileText className="text-vab-primary" size={22} />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-primary-100 text-vab-primary px-2 py-0.5 rounded-full">
                      {d.category.replace('_', ' ')}
                    </span>
                    {d.regulator && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {d.regulator}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline text-base font-semibold text-on-surface hover:text-vab-primary transition-colors line-clamp-2">
                    {d.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{d.summary}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-gray-500 font-medium">{d.publishDate}</span>
                    <div className="flex items-center gap-1 text-data-blue text-[10px] font-semibold uppercase tracking-wider">
                      <Download size={12} />
                      PDF
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 md:hidden">
            <Link href="/disclosures" className="flex items-center gap-2 text-data-blue hover:text-vab-primary transition-colors text-xs font-semibold uppercase tracking-wider">
              Xem Tất Cả <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-vab-primary mb-2">Sự Kiện & Lịch IR</h2>
              <p className="text-sm text-on-surface-variant">Những sự kiện quan trọng dành cho nhà đầu tư</p>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 text-data-blue hover:text-vab-primary transition-colors text-xs font-semibold uppercase tracking-wider">
              Lịch Đầy Đủ <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event, i) => (
              <div key={event.id} className="card p-6 flex flex-col gap-3 stagger-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-2">
                  <Calendar className="text-vab-primary" size={18} />
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${event.status === 'upcoming' ? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'}`}>
                    {event.status === 'upcoming' ? 'Sắp tới' : 'Đang diễn ra'}
                  </span>
                </div>
                <h3 className="font-headline text-base font-semibold text-on-surface">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span>{event.date}</span>
                </div>
                {event.replayUrl && (
                  <Link href={event.replayUrl} className="inline-flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors mt-2">
                    <ExternalLink size={12} />
                    Xem lại
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-deep text-white">
        <div className="max-w-container-max mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Bạn là Nhà Đầu Tư?</h2>
          <p className="text-base text-vab-primary-fixed-dim max-w-xl mx-auto mb-8">
            Truy cập bộ công cụ đầu tư đầy đủ: data pack, báo cáo tài chính, KPI dashboard và hơn thế nữa.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/disclosures" className="btn btn-primary">
              <Download size={16} /> Tải Báo Cáo
            </Link>
            <Link href="/events" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
              <Calendar size={16} /> Lịch IR
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
