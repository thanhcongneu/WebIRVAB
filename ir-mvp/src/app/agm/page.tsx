'use client';

import { Users, FileText, Download, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react';

const agmArchive = [
  {
    year: 2025,
    date: '25/04/2025',
    status: 'completed',
    docs: [
      { title: 'Nghị quyết ĐHĐCĐ', size: '1.2 MB' },
      { title: 'Biên bản họp ĐHĐCĐ', size: '2.1 MB' },
      { title: 'Báo cáo HĐQT', size: '3.5 MB' },
      { title: 'Báo cáo BKS', size: '1.8 MB' },
      { title: 'Tờ trình ĐHĐCĐ', size: '4.2 MB' },
    ],
  },
  {
    year: 2024,
    date: '26/04/2024',
    status: 'completed',
    docs: [
      { title: 'Nghị quyết ĐHĐCĐ', size: '1.1 MB' },
      { title: 'Biên bản họp ĐHĐCĐ', size: '2.0 MB' },
      { title: 'Báo cáo HĐQT', size: '3.3 MB' },
      { title: 'Báo cáo BKS', size: '1.7 MB' },
    ],
  },
  {
    year: 2023,
    date: '28/04/2023',
    status: 'completed',
    docs: [
      { title: 'Nghị quyết ĐHĐCĐ', size: '1.0 MB' },
      { title: 'Biên bản họp ĐHĐCĐ', size: '1.9 MB' },
    ],
  },
];

const faqItems = [
  {
    q: 'Khi nào Đại hội đồng cổ đông thường niên được tổ chức?',
    a: 'ĐHĐCĐ thường niên được tổ chức trong Quý II hàng năm, trước ngày 30/06 theo quy định pháp luật.',
  },
  {
    q: 'Làm sao để ủy quyền tham dự ĐHĐCĐ?',
    a: 'Cổ đông có thể ủy quyền bằng Giấy ủy quyền theo mẫu của Ngân hàng, có công chứng hoặc chứng thực.',
  },
  {
    q: 'Quyền biểu quyết được xác định như thế nào?',
    a: 'Quyền biểu quyết được xác định theo số cổ phần sở hữu tại ngày chốt danh sách cổ đông.',
  },
  {
    q: 'Cổ tức được thanh toán như thế nào?',
    a: 'Cổ tức được thanh toán qua tài khoản ngân hàng đã đăng ký với Ngân hàng hoặc qua bưu điện.',
  },
];

export default function AGMPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Trung Tâm Cổ Đông & ĐHĐCĐ</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Tài liệu Đại hội đồng cổ đông và hướng dẫn cổ đông</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* AGM Archive */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Users className="text-vab-primary" size={24} />
            Lưu Trữ ĐHĐCĐ
          </h2>
          <div className="space-y-4">
            {agmArchive.map(agm => (
              <div key={agm.year} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 bg-vab-primary/5 border-b border-outline-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="font-headline text-xl font-bold text-vab-primary">{agm.year}</span>
                    <span className="text-sm text-on-surface-variant">{agm.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-status-positive">
                      <CheckCircle size={14} /> Hoàn thành
                    </span>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-vab-primary text-white text-xs font-bold uppercase rounded hover:bg-vab-primary-container transition-colors">
                      <Download size={12} /> Tải tất cả
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-outline-variant/50">
                  {agm.docs.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-surface-container-low transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="text-vab-primary flex-shrink-0" size={16} />
                        <span className="text-sm text-on-surface">{doc.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-outline">{doc.size}</span>
                        <a href="#" className="text-xs font-bold text-data-blue hover:text-vab-primary transition-colors flex items-center gap-1">
                          <Download size={11} /> PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shareholder Guide */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Quyền Cổ Đông</h3>
            <ul className="space-y-3">
              {[
                'Quyền biểu quyết tại ĐHĐCĐ',
                'Quyền nhận cổ tức',
                'Quyền tiếp cận thông tin',
                'Quyền kiến nghị tại ĐHĐCĐ',
                'Quyền yêu cầu xem sổ cổ đông',
                'Quyền khiếu nại, tố cáo',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <CheckCircle size={14} className="text-status-positive flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Hướng Dẫn Cổ Đông</h3>
            <ul className="space-y-3">
              {[
                'Cập nhật thông tin tài khoản',
                'Đăng ký nhận thông báo điện tử',
                'Ủy quyền tham dự ĐHĐCĐ',
                'Đăng ký nhận cổ tức tự động',
                'Tra cứu số cổ phần sở hữu',
                'Liên hệ Bộ phận CSKH',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <HelpCircle size={14} className="text-data-blue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6">Câu Hỏi Thường Gặp</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details key={i} className="bg-surface-container-lowest border border-outline-variant rounded-lg group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <span className="text-sm font-bold text-on-surface">{item.q}</span>
                  <span className="text-outline group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/50 pt-3">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
