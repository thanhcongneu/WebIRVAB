'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Users, Leaf, Download, BarChart3 } from 'lucide-react';
import { kpiMetrics, stockData, boardMembers } from '@/data/ir-data';

const investmentPillars = [
  {
    icon: TrendingUp,
    title: 'Tăng Trưởng Bền Vững',
    titleEn: 'Sustainable Growth',
    desc: 'Tăng trưởng lợi nhuận compound 15%+ mỗi năm qua 5 năm liên tiếp. Quy mô tài sản vượt 105,000 tỷ VNĐ với danh mục cho vay đa dạng.',
    highlight: '+15%',
    highlightLabel: 'CAGR 5 năm',
  },
  {
    icon: Shield,
    title: 'An Toàn Vốn Hàng Đầu',
    titleEn: 'Industry-Leading Capital',
    desc: 'CAR đạt 11.5%, cao hơn mức quy định của NHNN. Tỷ lệ nợ xấu 1.8%, thuộc nhóm thấp nhất ngành ngân hàng Việt Nam.',
    highlight: '11.5%',
    highlightLabel: 'CAR Basel II',
  },
  {
    icon: BarChart3,
    title: 'Khả Năng Sinh Lời Cao',
    titleEn: 'Superior Profitability',
    desc: 'ROE đạt 18.2%, cao hơn trung bình ngành 3 điểm phần trăm. NIM ổn định 3.2% với chiến lược tối ưu hóa chi phí vốn.',
    highlight: '18.2%',
    highlightLabel: 'ROE Q3/2025',
  },
  {
    icon: Leaf,
    title: 'Phát Triển Bền Vững',
    titleEn: 'ESG Commitment',
    desc: 'Xếp hạng ESG A- từ MSCI, top 20% ngành ngân hàng Việt Nam. Danh mục tài chính xanh 12,500 tỷ VNĐ, cam kết Net Zero 2050.',
    highlight: 'A-',
    highlightLabel: 'ESG Rating 2024',
  },
];

const competitiveAdvantages = [
  { label: 'Thị phần cho vay bán lẻ', value: '18%', target: 'Top 3 toàn quốc' },
  { label: 'Tỷ lệ CASA', value: '42%', target: 'Chi phí vốn thấp nhất' },
  { label: 'Chi nhánh & ATM', value: '280+', target: 'Phủ rộng 63 tỉnh thành' },
  { label: 'Khách hàng cá nhân', value: '2.5M+', target: 'Cơ sở khách hàng lớn' },
];

const peerComparison = [
  { metric: 'ROE (%)', vab: '18.2', sectorAvg: '15.1', unit: '%' },
  { metric: 'NIM (%)', vab: '3.2', sectorAvg: '2.9', unit: '%' },
  { metric: 'NPL Ratio (%)', vab: '1.8', sectorAvg: '2.5', unit: '%' },
  { metric: 'CAR (%)', vab: '11.5', sectorAvg: '10.8', unit: '%' },
  { metric: 'CASA (%)', vab: '42', sectorAvg: '35', unit: '%' },
  { metric: 'CIR (%)', vab: '48', sectorAvg: '55', unit: '%' },
];

export default function WhyInvestPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative w-full min-h-[580px] flex items-center justify-center overflow-hidden bg-navy-deep text-white py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#122E5B] via-[#1B4486] to-transparent z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')] bg-cover bg-center opacity-30" />
        </div>
        <div className="relative z-20 max-w-container-max mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 bg-status-positive rounded-full animate-pulse" />
              Cổ phiếu niêm yết HOSE
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Vì Sao Đầu Tư VAB?
            </h1>
            <p className="text-base md:text-lg text-vab-primary-fixed-dim max-w-xl leading-relaxed">
              VietABank mang đến sự kết hợp hiếm có giữa tăng trưởng lợi nhuận mạnh mẽ, quản trị rủi ro chặt chẽ và cam kết phát triển bền vững.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/financials" className="btn btn-primary">
                Báo Cáo Tài Chính <ArrowRight size={16} />
              </Link>
              <Link href="/stock" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
                Thông Tin Cổ Phiếu
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
              <div className="flex items-center gap-1 text-status-positive text-sm font-semibold mt-1">
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

      {/* Investment Pillars */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-vab-primary mb-3">Trụ Cột Đầu Tư</h2>
            <p className="text-sm text-on-surface-variant max-w-2xl mx-auto">Bốn lý do cốt lõi giúp VietABank tạo ra giá trị bền vững cho cổ đông</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentPillars.map((pillar, i) => (
              <div key={i} className="card p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <pillar.icon className="text-vab-primary" size={24} />
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-3xl font-bold text-vab-primary">{pillar.highlight}</span>
                    <p className="text-[10px] text-on-surface-variant">{pillar.highlightLabel}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{pillar.title}</h3>
                  <p className="text-xs text-on-surface-variant mb-2">{pillar.titleEn}</p>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-vab-primary mb-8">Điểm Nhấn Tài Chính Q3/2025</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiMetrics.map((kpi) => (
              <div key={kpi.id} className="card p-4 flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">{kpi.name}</span>
                <div className="font-headline text-xl font-bold text-vab-primary">{kpi.value}</div>
                <div className={`text-[10px] font-medium ${kpi.changeType === 'positive' ? 'text-success' : kpi.changeType === 'negative' ? 'text-gray-500' : 'text-info'}`}>
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-vab-primary mb-8">Lợi Thế Cạnh Tranh</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitiveAdvantages.map((item, i) => (
              <div key={i} className="card p-5 text-center">
                <div className="font-headline text-3xl font-bold text-vab-primary mb-1">{item.value}</div>
                <p className="text-sm font-medium text-on-surface mb-1">{item.label}</p>
                <p className="text-xs text-on-surface-variant">{item.target}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peer Comparison */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-vab-primary mb-3">So Sánh Với Trung Bình Ngành</h2>
          <p className="text-sm text-on-surface-variant mb-8">Các chỉ số tài chính chính, Q3/2025</p>
          <div className="card overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Chỉ số</th>
                    <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">VAB</th>
                    <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Trung bình ngành</th>
                    <th className="text-center px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">Chênh lệch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {peerComparison.map((row) => {
                    const diff = (parseFloat(row.vab) - parseFloat(row.sectorAvg)).toFixed(1);
                    const isPositive = parseFloat(diff) >= 0;
                    return (
                      <tr key={row.metric} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-on-surface">{row.metric}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block bg-primary-100 text-vab-primary text-sm font-bold px-3 py-1 rounded-full">
                            {row.vab}{row.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-on-surface-variant">{row.sectorAvg}{row.unit}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-sm font-bold ${isPositive ? 'text-status-positive' : 'text-secondary'}`}>
                            {isPositive ? '+' : ''}{diff}{row.unit}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/financials" className="btn btn-primary">
              <Download size={16} /> Báo Cáo Đầy Đủ
            </Link>
            <Link href="/stock" className="btn btn-secondary">
              Thông Tin Cổ Phiếu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-vab-primary mb-8">Ban Lãnh Đạo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {boardMembers.slice(0, 4).map(member => (
              <div key={member.id} className="card p-5 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-headline text-2xl font-bold text-vab-primary">
                    {member.name.split(' ').slice(-1)[0][0]}
                  </span>
                </div>
                <h3 className="font-headline text-sm font-bold text-on-surface mb-1">{member.name}</h3>
                <p className="text-xs text-vab-primary font-medium">{member.position}</p>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-3">{member.bioEn}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/governance" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-vab-primary hover:underline">
              Xem Quản Trị Công Ty <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-deep text-white">
        <div className="max-w-container-max mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Sẵn Sàng Tìm Hiểu Thêm?</h2>
          <p className="text-base text-vab-primary-fixed-dim max-w-xl mx-auto mb-8">
            Truy cập bộ công cụ đầu tư đầy đủ: data pack, báo cáo tài chính, KPI dashboard và hơn thế nữa.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/financials" className="btn btn-primary">
              <BarChart3 size={16} /> Báo Cáo Tài Chính
            </Link>
            <Link href="/stock" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
              Thông Tin Cổ Phiếu
            </Link>
            <Link href="/disclosures" className="btn btn-secondary border-white/40 text-white hover:bg-white/10">
              <Download size={16} /> Tài Liệu IR
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
