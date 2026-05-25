'use client';

import { Download, FileText, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const analystCoverage = [
  { institution: 'VNDirect Securities', analyst: 'Nguyễn Hoàng Nam', rating: 'MUA', targetPrice: '19,500', upside: '+28.3%', date: '2025-11-10', prev: 'MUA', prevTarget: '18,200' },
  { institution: 'SSI Securities', analyst: 'Trần Minh Tuấn', rating: 'MUA', targetPrice: '18,800', upside: '+23.7%', date: '2025-11-05', prev: 'MUA', prevTarget: '17,500' },
  { institution: 'Techcom Securities', analyst: 'Phạm Thu Hà', rating: 'KHUNG THỊ TRƯỜNG', targetPrice: '—', upside: '—', date: '2025-10-28', prev: '—', prevTarget: '—' },
  { institution: 'Mirae Asset VN', analyst: 'Lê Quốc Trung', rating: 'MUA', targetPrice: '20,100', upside: '+32.2%', date: '2025-10-20', prev: 'MUA', prevTarget: '19,000' },
  { institution: 'Yuanta Securities VN', analyst: 'Đặng Phương Linh', rating: 'MUA', targetPrice: '18,200', upside: '+19.7%', date: '2025-10-15', prev: 'NẮM GIỮ', prevTarget: '16,800' },
  { institution: 'KIS Vietnam', analyst: 'Vũ Thị Mai', rating: 'NẮM GIỮ', targetPrice: '16,500', upside: '+8.6%', date: '2025-10-08', prev: 'NẮM GIỮ', prevTarget: '15,500' },
  { institution: 'FPTS Securities', analyst: 'Hoàng Đình Kiên', rating: 'MUA', targetPrice: '19,000', upside: '+25.0%', date: '2025-09-25', prev: 'MUA', prevTarget: '17,800' },
  { institution: 'Vietcap Securities', analyst: 'Ngô Thị Lan', rating: 'MUA', targetPrice: '17,800', upside: '+17.1%', date: '2025-09-12', prev: 'MUA', prevTarget: '16,200' },
];

const consensusEstimates = [
  { metric: 'EPS 2025E', unit: 'VND', low: '1,420', med: '1,520', high: '1,640', consensus: '1,520' },
  { metric: 'EPS 2026E', unit: 'VND', low: '1,680', med: '1,780', high: '1,920', consensus: '1,780' },
  { metric: 'P/E 2025E', unit: 'x', low: '8.5', med: '10.0', high: '12.8', consensus: '10.0' },
  { metric: 'P/B 2025E', unit: 'x', low: '1.2', med: '1.4', high: '1.8', consensus: '1.4' },
  { metric: 'ROE 2025E', unit: '%', low: '17.5', med: '18.5', high: '19.2', consensus: '18.5' },
  { metric: 'NIM 2025E', unit: '%', low: '3.1', med: '3.2', high: '3.4', consensus: '3.2' },
];

const sectorComparison = [
  { metric: 'ROE (%)', vab: '18.2', sectorAvg: '15.1', sectorMedian: '14.8', unit: '%' },
  { metric: 'P/E (x)', vab: '10.0', sectorAvg: '11.2', sectorMedian: '10.5', unit: 'x' },
  { metric: 'P/B (x)', vab: '1.4', sectorAvg: '1.6', sectorMedian: '1.5', unit: 'x' },
  { metric: 'CAR (%)', vab: '11.5', sectorAvg: '10.8', sectorMedian: '10.5', unit: '%' },
  { metric: 'NPL (%)', vab: '1.8', sectorAvg: '2.5', sectorMedian: '2.2', unit: '%' },
  { metric: 'CASA (%)', vab: '42', sectorAvg: '35', sectorMedian: '33', unit: '%' },
  { metric: 'C/I Ratio (%)', vab: '48', sectorAvg: '55', sectorMedian: '53', unit: '%' },
];

const researchReports = [
  { title: 'Báo cáo cập nhật VAB - Q3/2025 - VNDirect', analyst: 'Nguyễn Hoàng Nam', date: '2025-11-10', pages: 45 },
  { title: 'Báo cáo định giá VAB 2025-2026 - Mirae Asset', analyst: 'Lê Quốc Trung', date: '2025-10-20', pages: 32 },
  { title: 'Industry Report: Ngành Ngân hàng VN - SSI', analyst: 'Trần Minh Tuấn', date: '2025-10-28', pages: 28 },
  { title: 'Initiation Coverage VAB - Yuanta', analyst: 'Đặng Phương Linh', date: '2025-10-15', pages: 55 },
  { title: 'Thẩm định Báo cáo Tài chính VAB Q3 - FPTS', analyst: 'Hoàng Đình Kiên', date: '2025-09-25', pages: 18 },
];

const valuationMethods = [
  {
    label: 'DCF (Chiết khấu dòng tiền)',
    description: 'Chiết khấu dòng tiền tự do giai đoạn 2025-2030 với WACC 11.5% và tăng trưởng cuối kỳ 4%. Giả định NIM ổn định, chi phí tín dụng được kiểm soát.',
    value: '19,200 VND',
    weight: 40,
  },
  {
    label: 'P/B So Sánh (Relatives)',
    description: 'So sánh P/B với các ngân hàng cùng hạng tại ASEAN. VAB giao dịch ở P/B 1.4x so với trung bình ngành 1.6x — discount 12.5% do thanh khoản thấp hơn.',
    value: '18,500 VND',
    weight: 35,
  },
  {
    label: 'DDM (Chiết khấu cổ tức)',
    description: 'Mô hình Gordon với tỷ lệ chi trả cổ tức 25% và tăng trưởng lợi nhuận dài hạn 12%. Định giá conservative phản ánh lộ trình tăng tỷ lệ chi trả.',
    value: '17,800 VND',
    weight: 15,
  },
  {
    label: 'RNAV (Giá trị sổ sách điều chỉnh)',
    description: 'Định giá danh mục cho vay và đầu tư theo giá trị thị trường. Premium 15% cho chất lượng tài sản cao hơn trung bình ngành.',
    value: '20,500 VND',
    weight: 10,
  },
];

export default function AnalystPage() {
  const buyCount = analystCoverage.filter(a => a.rating === 'MUA').length;
  const holdCount = analystCoverage.filter(a => a.rating === 'NẮM GIỮ').length;
  const avgTarget = (18200 + 18800 + 20100 + 18200 + 16500 + 19000 + 17800) / 7;
  const currentPrice = 15200;
  const avgUpside = ((avgTarget - currentPrice) / currentPrice * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Institutional</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Phân Tích & Ứng Viên</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Bao phủ phân tích, ước tính đồng thuận và phương pháp định giá</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Consensus Summary */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Đánh Giá Mua</p>
              <p className="font-headline text-3xl font-bold text-status-positive">{buyCount}/{analystCoverage.length}</p>
              <p className="text-xs text-on-surface-variant">với lệnh MUA</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Nắm Giữ</p>
              <p className="font-headline text-3xl font-bold text-warning">{holdCount}/{analystCoverage.length}</p>
              <p className="text-xs text-on-surface-variant">với lệnh NẮM GIỮ</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Giá Mục Tiêu TB</p>
              <p className="font-headline text-3xl font-bold text-vab-primary">{avgTarget.toLocaleString('vi-VN')}</p>
              <p className="text-xs text-on-surface-variant">VND</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Upside Trung Bình</p>
              <p className="font-headline text-3xl font-bold text-status-positive">+{avgUpside}%</p>
              <p className="text-xs text-on-surface-variant">vs {currentPrice.toLocaleString('vi-VN')} VND</p>
            </div>
          </div>
        </section>

        {/* Analyst Coverage Table */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-2xl font-bold text-vab-primary flex items-center gap-2">
              <BarChart3 className="text-vab-primary" size={24} />
              Bao Phủ Từ Nhà Phân Tích
            </h2>
          </div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    {['Công Ty', 'Nhà Phân Tích', 'Đánh Giá', 'Giá Mục Tiêu', 'Upside', 'Ngày', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analystCoverage.map((item, i) => {
                    const isBuy = item.rating === 'MUA';
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-on-surface">{item.institution}</td>
                        <td className="px-4 py-3 text-xs text-on-surface-variant">{item.analyst}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${isBuy ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'}`}>
                            {item.rating}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-on-surface">
                          {item.targetPrice === '—' ? (
                            <span className="text-on-surface-variant">—</span>
                          ) : (
                            item.targetPrice
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {item.upside === '—' ? (
                            <span className="text-on-surface-variant text-xs">—</span>
                          ) : (
                            <span className="text-xs font-bold text-status-positive flex items-center gap-1">
                              {parseFloat(item.upside) > 20 ? <TrendingUp size={12} /> : null}
                              {item.upside}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-on-surface-variant">{item.date}</td>
                        <td className="px-4 py-3">
                          <a href="#" className="text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors flex items-center gap-1">
                            <Download size={11} /> Báo cáo
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant mt-3">
            * Chỉ mang tính tham khảo. Đánh giá của các công ty chứng khoán không phản ánh quan điểm của VietABank.
          </p>
        </section>

        {/* Consensus Estimates */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <TrendingUp className="text-vab-primary" size={24} />
            Ước Tính Đồng Thuận
          </h2>
          <div className="card overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    {['Chỉ số', '', 'Thấp', 'Trung bình', 'Cao', 'Đồng thuận'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {consensusEstimates.map((row) => (
                    <tr key={row.metric} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-on-surface">{row.metric}</td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant">{row.unit}</td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant">{row.low}</td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant">{row.med}</td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant">{row.high}</td>
                      <td className="px-4 py-3">
                        <span className="bg-primary-100 text-vab-primary text-xs font-bold px-2 py-0.5 rounded">
                          {row.consensus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Valuation Methodology */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <BarChart3 className="text-vab-primary" size={24} />
            Phương Pháp Định Giá
          </h2>
          <div className="space-y-4 mb-6">
            {valuationMethods.map((method) => (
              <div key={method.label} className="card p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-headline text-sm font-bold text-on-surface">{method.label}</h3>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="font-headline text-xl font-bold text-vab-primary">{method.value}</span>
                      <span className="text-xs text-on-surface-variant ml-2">Trọng số {method.weight}%</span>
                    </div>
                    <div className="w-16 bg-surface-container-high rounded-full h-2">
                      <div className="bg-vab-primary h-2 rounded-full" style={{ width: `${method.weight * 2.5}%` }} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{method.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-vab-primary">Giá trị hợp lý đồng thuận:</strong> 18,700 VND — Giá thị trường hiện tại: 15,200 VND — Upside tiềm năng: +23.0%. Mô hình DCF chiếm trọng số cao nhất (40%) do tính ổn định của dòng tiền ngân hàng.
            </p>
          </div>
        </section>

        {/* Sector Comparison */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6">So Sánh Với Ngành</h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    {['Chỉ số', 'VAB', 'TB Ngành', 'Median Ngành', 'VAB vs Median'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sectorComparison.map((row) => {
                    const diff = parseFloat(row.vab) - parseFloat(row.sectorMedian);
                    const isBetter = (row.metric.includes('ROE') || row.metric.includes('CASA') || row.metric.includes('CAR')) ? diff > 0 : diff > 0;
                    return (
                      <tr key={row.metric} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-on-surface">{row.metric}</td>
                        <td className="px-4 py-3">
                          <span className="bg-primary-100 text-vab-primary text-xs font-bold px-2 py-0.5 rounded">
                            {row.vab}{row.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-on-surface-variant">{row.sectorAvg}{row.unit}</td>
                        <td className="px-4 py-3 text-xs text-on-surface-variant">{row.sectorMedian}{row.unit}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold flex items-center gap-1 ${isBetter ? 'text-status-positive' : 'text-secondary'}`}>
                            {isBetter ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {isBetter ? '+' : ''}{diff.toFixed(1)}{row.unit}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Research Reports */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <FileText className="text-vab-primary" size={24} />
            Báo Cáo Nghiên Cứu
          </h2>
          <div className="card overflow-hidden mb-6">
            {researchReports.map((report, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${i !== researchReports.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <FileText className="text-vab-primary flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-medium text-on-surface">{report.title}</p>
                    <p className="text-xs text-on-surface-variant">{report.analyst} — {report.date} — {report.pages} trang</p>
                  </div>
                </div>
                <a href="#" className="text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors flex items-center gap-1">
                  <Download size={12} /> PDF
                </a>
              </div>
            ))}
          </div>

          {/* Valuation Model Downloads */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Mô Hình Định Giá Excel</h3>
            <div className="flex gap-4 flex-wrap">
              <button className="btn btn-primary">
                <Download size={16} /> DCF Model VAB 2025
              </button>
              <button className="btn btn-secondary">
                <Download size={16} /> Comparative Analysis
              </button>
              <button className="btn btn-secondary">
                <Download size={16} /> Financial Model Full
              </button>
            </div>
            <p className="text-xs text-on-surface-variant mt-3">
              Mô hình được cung cấp bởi VietABank IR. Mọi sử dụng cho mục đích tham khảo và không cấu thành lời khuyên đầu tư.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
