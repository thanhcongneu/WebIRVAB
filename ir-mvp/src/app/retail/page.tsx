'use client';

import { useState } from 'react';
import { BookOpen, HelpCircle, Video, TrendingUp, Shield, Users, Download, CheckCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const glossary = [
  {
    term: 'NIM (Biên Lãi Ròng)',
    termEn: 'Net Interest Margin',
    definition: 'Chênh lệch giữa lãi suất cho vay và lãi suất huy động, chia cho tổng tài sản sinh lãi. NIM càng cao = ngân hàng càng hiệu quả trong việc tạo ra lợi nhuận từ hoạt động tín dụng.',
    simple: 'NIM cho biết ngân hàng "lãi" bao nhiêu từ việc cho vay. VAB NIM 3.2% nghĩa là cứ 100đ tài sản sinh lãi tạo ra 3.2đ lợi nhuận lãi.',
    unit: '%',
  },
  {
    term: 'NPL (Tỷ Lệ Nợ Xấu)',
    termEn: 'Non-Performing Loan Ratio',
    definition: 'Tỷ lệ phần trăm dư nợ cho vay mà người vay không trả được lãi hoặc gốc trong thời hạn quy định (thường là 90 ngày).',
    simple: 'NPL càng thấp = ngân hàng càng ít rủi ro. NPL dưới 3% được coi là an toàn. VAB có NPL 1.8% — thuộc nhóm thấp nhất ngành.',
    unit: '%',
  },
  {
    term: 'CAR (Tỷ Lệ An Toàn Vốn)',
    termEn: 'Capital Adequacy Ratio',
    definition: 'Tỷ lệ giữa vốn tự có và tài sản có rủi ro. CAR đảm bảo ngân hàng có đủ vốn để chịu được rủi ro. Basel II yêu cầu tối thiểu 8%.',
    simple: 'CAR giống như "gối khí" của ngân hàng. CAR 11.5% nghĩa là VAB có vốn dự phòng cao gấp 1.4 lần mức tối thiểu quốc tế.',
    unit: '%',
  },
  {
    term: 'ROE (Lợi Nhuận Trên Vốn Chủ)',
    termEn: 'Return on Equity',
    definition: 'Tỷ lệ lợi nhuận sau thuế trên vốn chủ sở hữu. ROE đo lường hiệu quả sử dụng vốn của cổ đông.',
    simple: 'ROE 18.2% nghĩa là cứ 100đ vốn cổ đông tạo ra 18.2đ lợi nhuận. Cao hơn trung bình ngành 15.1%.',
    unit: '%',
  },
  {
    term: 'CASA (Tiền Gửi Không Kỳ Hạn)',
    termEn: 'Current and Savings Account',
    definition: 'Tiền gửi thanh toán và tiết kiệm không kỳ hạn. CASA có chi phí thấp vì không phải trả lãi suất cao như tiền gửi có kỳ hạn.',
    simple: 'CASA cao = chi phí vốn thấp = lợi nhuận cao. VAB CASA 42% giúp giảm chi phí vốn đáng kể.',
    unit: '%',
  },
  {
    term: 'EPS (Lợi Nhuận Trên Cổ Phiếu)',
    termEn: 'Earnings Per Share',
    definition: 'Lợi nhuận sau thuế chia cho tổng số cổ phiếu lưu hành. EPS cho biết mỗi cổ phiếu mang lại bao nhiêu đồng lợi nhuận.',
    simple: 'EPS càng cao = cổ phiếu càng hấp dẫn. EPS VAB ước tính 1,520 VND/cp cho 2025.',
    unit: 'VND/cp',
  },
  {
    term: 'P/E (Chỉ Số Giá Trên Lợi Nhuận)',
    termEn: 'Price-to-Earnings Ratio',
    definition: 'Giá cổ phiếu hiện tại chia cho EPS. P/E cho biết nhà đầu tư sẵn sàng trả bao nhiêu cho 1 đồng lợi nhuận.',
    simple: 'P/E 10x = nhà đầu tư trả 10đ để nhận 1đ lợi nhuận/năm. P/E thấp hơn trung bình ngành = cổ phiếu có thể đang bị định giá thấp.',
    unit: 'x',
  },
  {
    term: 'P/B (Chỉ Số Giá Trên Giá Trị Sổ Sách)',
    termEn: 'Price-to-Book Ratio',
    definition: 'Giá cổ phiếu chia cho giá trị sổ sách trên mỗi cổ phiếu. P/B dưới 1 có thể cho thấy cổ phiếu đang bị "rẻ".',
    simple: 'P/B 1.4x = giá thị trường cao hơn giá trị tài sản ròng rành 40%. So sánh với P/B ngành 1.6x.',
    unit: 'x',
  },
];

const shareholderRights = [
  { icon: CheckCircle, title: 'Quyền biểu quyết', desc: 'Biểu quyết tại ĐHĐCĐ với mỗi cổ phần = 1 phiếu bầu' },
  { icon: CheckCircle, title: 'Quyền nhận cổ tức', desc: 'Được nhận cổ tức theo nghị quyết ĐHĐCĐ hàng năm' },
  { icon: CheckCircle, title: 'Quyền tiếp cận thông tin', desc: 'Được cung cấp thông tin đầy đủ, kịp thời, chính xác' },
  { icon: CheckCircle, title: 'Quyền kiến nghị', desc: 'Kiến nghị với HĐQT về các vấn đề thuộc thẩm quyền ĐHĐCĐ' },
  { icon: CheckCircle, title: 'Quyền yêu cầu họp ĐHĐCĐ bất thường', desc: 'Cổ đông sở hữu >= 10% cổ phần có quyền yêu cầu triệu tập họp bất thường' },
  { icon: CheckCircle, title: 'Quyền khiếu nại', desc: 'Khiếu nại các quyết định của HĐQT, Ban Kiểm soát' },
];

const howToReadFinancials = [
  {
    step: 1,
    icon: TrendingUp,
    title: 'Xem lợi nhuận',
    desc: 'Tìm dòng "Lợi nhuận sau thuế" trong Báo cáo Kết quả Kinh doanh. VAB Q3/2025: 1,250 tỷ VNĐ, tăng 8.5% so với cùng kỳ năm ngoái.',
    tip: 'So sánh với cùng kỳ năm trước (YoY) để thấy xu hướng tăng trưởng.',
  },
  {
    step: 2,
    icon: Shield,
    title: 'Kiểm tra rủi ro',
    desc: 'Xem NPL (nợ xấu) và CAR (vốn tự có). VAB NPL 1.8% và CAR 11.5% cho thấy ngân hàng kiểm soát rủi ro tốt.',
    tip: 'NPL dưới 3% và CAR trên 10% là mức an toàn theo chuẩn quốc tế.',
  },
  {
    step: 3,
    icon: Users,
    title: 'Đánh giá hiệu quả',
    desc: 'Xem ROE (lợi nhuận trên vốn chủ) và NIM (biên lãi ròng). VAB ROE 18.2% và NIM 3.2% — cao hơn trung bình ngành.',
    tip: 'So sánh ROE với các ngân hàng khác trong ngành để đánh giá tương đối.',
  },
  {
    step: 4,
    icon: BookOpen,
    title: 'Đọc báo cáo đầy đủ',
    desc: 'Tải Báo cáo Tài chính đã kiểm toán từ mục Công Bố Thông Tin. Báo cáo bao gồm Bảng cân đối kế toán, Báo cáo KQKD, Báo cáo lưu chuyển tiền tệ.',
    tip: 'Đọc cả Thuyết minh báo cáo tài chính để hiểu chi tiết từng khoản mục.',
  },
];

export default function RetailPage() {
  const [expandedGlossary, setExpandedGlossary] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="text-status-positive" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider text-status-positive">Dành cho cổ đông</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Trung Tâm Cổ Đông Cá Nhân</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Hướng dẫn đơn giản giúp bạn hiểu về cổ phiếu VAB và quyền lợi cổ đông</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Quick Stats Banner */}
        <div className="bg-vab-primary/10 border border-vab-primary/20 rounded-xl p-6 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Giá VAB', value: '15,200 VND', sub: 'HOSE' },
            { label: 'Cổ tức 2024', value: '1,200 VND/cp', sub: 'Đã chi trả' },
            { label: 'NPL Ratio', value: '1.8%', sub: 'Dưới mức quy định' },
            { label: 'Cổ đông', value: '18,500+', sub: 'Người sở hữu' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="font-headline text-xl md:text-2xl font-bold text-vab-primary">{item.value}</p>
              <p className="text-xs text-on-surface-variant mt-1">{item.label}</p>
              <p className="text-[10px] text-outline uppercase tracking-wider">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* How to Read Bank Financials */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <BookOpen className="text-vab-primary" size={24} />
            Cách Đọc Báo Cáo Tài Chính Ngân Hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {howToReadFinancials.map(step => (
              <div key={step.step} className="card p-5 relative">
                <div className="absolute -top-3 left-4 w-8 h-8 bg-vab-primary rounded-full flex items-center justify-center">
                  <span className="font-headline text-sm font-bold text-white">{step.step}</span>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-2">
                  <step.icon className="text-vab-primary" size={18} />
                  <h3 className="font-headline text-sm font-bold text-on-surface">{step.title}</h3>
                </div>
                <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">{step.desc}</p>
                <div className="bg-primary-50 border border-primary-100 rounded p-2">
                  <p className="text-[10px] text-vab-primary font-semibold">💡 Mẹo: {step.tip}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/financials"
            className="inline-flex items-center gap-2 text-sm font-bold text-vab-primary hover:underline"
          >
            Xem Báo Cáo Tài Chính Đầy Đủ <ArrowRight size={14} />
          </Link>
        </section>

        {/* Glossary */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <HelpCircle className="text-vab-primary" size={24} />
            Từ Điển Ngân Hàng
          </h2>
          <div className="space-y-3">
            {glossary.map(item => (
              <div
                key={item.term}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedGlossary(expandedGlossary === item.term ? null : item.term)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-vab-primary rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-on-surface">{item.term}</p>
                      <p className="text-xs text-on-surface-variant">{item.termEn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-sm font-semibold text-vab-primary bg-primary-50 px-3 py-1 rounded-full">
                      {item.unit}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-outline transition-transform ${expandedGlossary === item.term ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>
                {expandedGlossary === item.term && (
                  <div className="px-5 pb-5 border-t border-outline-variant/50">
                    <p className="text-sm text-on-surface-variant leading-relaxed mt-4 mb-3">{item.definition}</p>
                    <div className="bg-status-positive/5 border border-status-positive/20 rounded-lg p-4">
                      <p className="text-xs font-semibold text-status-positive mb-1">📖 Giải thích đơn giản:</p>
                      <p className="text-sm text-on-surface leading-relaxed">{item.simple}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Shareholder Rights */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Users className="text-vab-primary" size={24} />
            Quyền Lợi Cổ Đông
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shareholderRights.map((item, i) => (
              <div key={i} className="card p-5 flex gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-vab-primary" size={18} />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-on-surface mb-1">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Video className="text-vab-primary" size={24} />
            Video Hướng Dẫn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Giải thích NIM và NPL bằng hình ảnh', duration: '5 phút', type: 'Cơ bản' },
              { title: 'Cách đọc Báo cáo Tài chính ngân hàng', duration: '12 phút', type: 'Trung bình' },
              { title: 'Hiểu CAR và vốn tự có ngân hàng', duration: '8 phút', type: 'Nâng cao' },
            ].map((video, i) => (
              <div key={i} className="card overflow-hidden group">
                <div className="relative bg-navy-deep aspect-video flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    <span className="text-vab-primary text-xl ml-1">▶</span>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded z-10">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary-50 text-vab-primary px-2 py-0.5 rounded mb-2 inline-block">
                    {video.type}
                  </span>
                  <p className="text-sm font-semibold text-on-surface">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-vab-primary/5 border border-vab-primary/20 rounded-xl p-6 text-center">
          <h2 className="font-headline text-xl font-bold text-vab-primary mb-2">Bạn Cần Hỗ Trợ Thêm?</h2>
          <p className="text-sm text-on-surface-variant mb-4 max-w-lg mx-auto">
            Đội ngũ Quan hệ Nhà đầu tư sẵn sàng hỗ trợ bạn về mọi thắc mắc liên quan đến cổ phiếu VAB.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="btn btn-primary">
              Liên Hệ IR
            </Link>
            <Link href="/disclosures" className="btn btn-secondary">
              <Download size={14} /> Tải Tài Liệu
            </Link>
            <Link href="/agm" className="btn btn-ghost">
              Trung Tâm Cổ Đông
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
