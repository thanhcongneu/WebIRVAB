'use client';

import { Download, TrendingUp, Shield, FileText, ExternalLink } from 'lucide-react';

const bondProgram = [
  { tranche: 'Tranche 1', issueDate: '15/03/2023', maturity: '15/03/2026', amount: '1,500 Tỷ', coupon: '8.5%', rating: 'AA-', status: 'Outstanding' },
  { tranche: 'Tranche 2', issueDate: '20/06/2023', maturity: '20/06/2027', amount: '2,000 Tỷ', coupon: '8.8%', rating: 'AA-', status: 'Outstanding' },
  { tranche: 'Tranche 3', issueDate: '10/08/2025', maturity: '10/08/2028', amount: '2,500 Tỷ', coupon: '7.5%', rating: 'AA-', status: 'Outstanding' },
  { tranche: 'Tranche 4', issueDate: '15/01/2026', maturity: '15/01/2029', amount: '3,000 Tỷ', coupon: '7.2%', rating: 'AA-', status: 'Upcoming' },
];

const interestSchedule = [
  { period: '2023', tranche1: '8.5%', tranche2: '-', tranche3: '-', tranche4: '-' },
  { period: '2024', tranche1: '8.5%', tranche2: '8.8%', tranche3: '-', tranche4: '-' },
  { period: '2025', tranche1: '8.5%', tranche2: '8.8%', tranche3: '7.5%', tranche4: '-' },
  { period: '2026 Q1', tranche1: 'Payoff', tranche2: '8.8%', tranche3: '7.5%', tranche4: '-' },
  { period: '2026 Q2-Q4', tranche1: '-', tranche2: '8.8%', tranche3: '7.5%', tranche4: '-' },
  { period: '2027', tranche1: '-', tranche2: 'Payoff', tranche3: '7.5%', tranche4: '-' },
  { period: '2028', tranche1: '-', tranche2: '-', tranche3: 'Payoff', tranche4: '7.2%' },
  { period: '2029', tranche1: '-', tranche2: '-', tranche3: '-', tranche4: 'Payoff' },
];

const covenants = [
  { category: 'Giới hạn nợ', covenant: 'Tổng nợ không vượt quá 3x vốn chủ sở hữu', status: 'Đang tuân thủ', compliant: true },
  { category: 'CAR tối thiểu', covenant: 'CAR duy trì >= 10.5% mọi lúc', status: 'Đang tuân thủ (11.5%)', compliant: true },
  { category: 'NPL giới hạn', covenant: 'NPL ratio <= 3.5%', status: 'Đang tuân thủ (1.8%)', compliant: true },
  { category: 'Thanh toán', covenant: 'Trả lãi + gốc đúng hạn', status: 'Đang tuân thủ', compliant: true },
  { category: 'Thay đổi kiểm soát', covenant: 'Cần sự chấp thuận nếu thay đổi quyền kiểm soát > 30%', status: 'Không vi phạm', compliant: true },
];

const creditRatings = [
  { agency: 'Fitch Ratings', local: 'AA-', outlook: 'Ổn định', date: 'Tháng 6/2025', prev: 'BBB+' },
  { agency: 'Moody\'s', local: 'Aa3', outlook: 'Ổn định', date: 'Tháng 8/2025', prev: 'A3' },
  { agency: 'VIS Rating', local: 'AA-', outlook: 'Tích cực', date: 'Tháng 9/2025', prev: 'A+' },
];

const bondDocs = [
  { title: 'Prospectus Trái Phiếu Tranche 3', updated: '10/08/2025', size: '5.2 MB' },
  { title: 'Prospectus Trái Phiếu Tranche 1 & 2', updated: '15/03/2023', size: '4.8 MB' },
  { title: 'Báo Cáo Định Kỳ Q3/2025', updated: '28/10/2025', size: '2.1 MB' },
  { title: 'Annual Report Trái Chủ 2024', updated: '28/02/2025', size: '3.5 MB' },
  { title: 'Cập Nhật Xếp Hạng Tín Dụng 2025', updated: '15/09/2025', size: '1.2 MB' },
];

export default function FixedIncomePage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Trái Phiếu Doanh Nghiệp</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Trái Phiếu & Nợ Vay</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Thông tin trái phiếu doanh nghiệp VietABank dành cho nhà đầu tư thu nhập cố định</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Bond Program Overview */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <TrendingUp className="text-vab-primary" size={24} />
            Chương Trình Trái Phiếu
          </h2>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Tổng Phát Hành</p>
              <p className="font-headline text-2xl font-bold text-vab-primary">9,000 Tỷ</p>
              <p className="text-xs text-on-surface-variant">VNĐ</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Đang Lưu Hành</p>
              <p className="font-headline text-2xl font-bold text-vab-primary">6,000 Tỷ</p>
              <p className="text-xs text-on-surface-variant">VNĐ</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Xếp Hạng Tín Dụng</p>
              <p className="font-headline text-2xl font-bold text-status-positive">AA-</p>
              <p className="text-xs text-on-surface-variant">Fitch Ratings</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">Kỳ Hạn Trung Bình</p>
              <p className="font-headline text-2xl font-bold text-vab-primary">3.2 năm</p>
              <p className="text-xs text-on-surface-variant">Weighted Avg</p>
            </div>
          </div>

          {/* Bond Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    {['Tranche', 'Ngày Phát Hành', 'Ngày Đáo Hạn', 'Số Tiền', 'Lãi Suất', 'Xếp Hạng', 'Trạng thái'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bondProgram.map((bond) => (
                    <tr key={bond.tranche} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-vab-primary">{bond.tranche}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{bond.issueDate}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{bond.maturity}</td>
                      <td className="px-4 py-3 text-sm font-medium">{bond.amount}</td>
                      <td className="px-4 py-3 text-sm font-medium text-vab-primary">{bond.coupon}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="bg-success-100 text-success-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {bond.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${bond.status === 'Outstanding' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'}`}>
                          {bond.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Maturity Profile */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Maturity Bar Chart */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Cơ Cấu Đáo Hạn</h3>
            <div className="space-y-3">
              {[
                { year: '2026', amount: '1,500 Tỷ', pct: 25, color: 'bg-danger-500' },
                { year: '2027', amount: '2,000 Tỷ', pct: 33, color: 'bg-warning-500' },
                { year: '2028', amount: '2,500 Tỷ', pct: 42, color: 'bg-vab-primary' },
                { year: '2029', amount: '3,000 Tỷ', pct: 50, color: 'bg-primary-400' },
              ].map(item => (
                <div key={item.year} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-on-surface-variant w-12">{item.year}</span>
                  <div className="flex-1 bg-surface-container-high rounded-full h-5">
                    <div
                      className={`${item.color} h-5 rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${item.pct}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{item.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interest Schedule Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 overflow-x-auto">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Lịch Trả Lãi (%/năm)</h3>
            <table className="table">
              <thead>
                <tr className="bg-primary-50">
                  {['Kỳ', 'T1 (8.5%)', 'T2 (8.8%)', 'T3 (7.5%)', 'T4 (7.2%)'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-vab-primary whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {interestSchedule.map((row) => (
                  <tr key={row.period} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 text-xs font-semibold text-on-surface">{row.period}</td>
                    <td className="px-3 py-2 text-xs text-center">{row.tranche1}</td>
                    <td className="px-3 py-2 text-xs text-center">{row.tranche2}</td>
                    <td className="px-3 py-2 text-xs text-center">{row.tranche3}</td>
                    <td className="px-3 py-2 text-xs text-center">{row.tranche4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Credit Ratings */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Shield className="text-vab-primary" size={24} />
            Xếp Hạng Tín Dụng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {creditRatings.map((rating) => (
              <div key={rating.agency} className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-3">{rating.agency}</p>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="font-headline text-4xl font-bold text-vab-primary">{rating.local}</span>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full ${rating.outlook === 'Ổn định' ? 'bg-success-100 text-success-700' : 'bg-primary-100 text-vab-primary'}`}>
                    {rating.outlook}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Cập nhật: {rating.date}</span>
                  <span>Trước: {rating.prev}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Ghi chú:</strong> Xếp hạng tín dụng được thực hiện bởi các tổ chức xếp hạng độc lập. VietABank đã được nâng hạng từ BBB+ lên AA- bởi Fitch Ratings trong đợt đánh giá tháng 6/2025, phản ánh cải thiện về chất lượng tài sản và khả năng sinh lời.
            </p>
          </div>
        </section>

        {/* Covenants */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6">Cam Kết Trái Chủ (Covenants)</h2>
          <div className="card overflow-hidden">
            <table className="table">
              <thead>
                <tr className="bg-vab-primary text-white">
                  {['Loại Cam Kết', 'Nội Dung', 'Tình Trạng', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {covenants.map((cov) => (
                  <tr key={cov.category} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-semibold text-on-surface">{cov.category}</td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{cov.covenant}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${cov.compliant ? 'bg-success-100 text-success-700' : 'bg-danger-100 text-danger-700'}`}>
                        {cov.compliant ? '✓' : '✗'} {cov.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Documents */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <FileText className="text-vab-primary" size={24} />
            Tài Liệu Trái Phiếu
          </h2>
          <div className="card overflow-hidden">
            {bondDocs.map((doc, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${i !== bondDocs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <FileText className="text-vab-primary flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-medium text-on-surface">{doc.title}</p>
                    <p className="text-xs text-on-surface-variant">Cập nhật: {doc.updated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-outline hidden md:block">{doc.size}</span>
                  <a href="#" className="text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors flex items-center gap-1">
                    <Download size={12} /> PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 flex-wrap">
            <button className="btn btn-primary">
              <Download size={16} /> Bộ Prospectus Đầy Đủ
            </button>
          </div>
        </section>

        {/* Secondary Market & Contact */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Thị Trường Thứ Cấp</h3>
            <ul className="space-y-3">
              {[
                'Giao dịch trên HNX với mã VAB23201, VAB23202',
                'Thanh toán T+2 qua hệ thống VSD',
                'Nhà tạo lập thị trường: các công ty chứng khoán được ủy quyền',
                'Thanh khoản trung bình: ~50 tỷ/phiên',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span className="w-1.5 h-1.5 bg-vab-primary rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors mt-4">
              Xem lịch sử giao dịch <ExternalLink size={12} />
            </a>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Liên Hệ Nhà Đầu Tư Trái Phiếu</h3>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <span className="font-semibold text-on-surface block">IR Fixed Income Desk</span>
              </li>
              <li>
                <span className="font-semibold block">Email:</span>
                <a href="mailto:bonds@vietabank.com.vn" className="hover:text-vab-primary transition-colors underline">bonds@vietabank.com.vn</a>
              </li>
              <li>
                <span className="font-semibold block">Điện thoại:</span>
                <a href="tel:+842412345678" className="hover:text-vab-primary transition-colors underline">+84 24 1234 5678</a>
              </li>
              <li>
                <span className="font-semibold block">Giờ làm việc:</span>
                Thứ 2 - Thứ 6, 8:00 - 17:00 (GMT+7)
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
