'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, FileText, Lock, Download } from 'lucide-react';
import { boardMembers } from '@/data/ir-data';

const governanceDocs = [
  { title: 'Điều lệ Ngân hàng', titleEn: 'Bank Charter', updated: '2025-01-15' },
  { title: 'Quy chế HĐQT', titleEn: 'Board of Directors Charter', updated: '2025-01-15' },
  { title: 'Quy chế Ban Kiểm soát', titleEn: 'Board of Supervisors Charter', updated: '2025-01-15' },
  { title: 'Quy chế Quản trị Rủi ro', titleEn: 'Risk Management Charter', updated: '2024-06-20' },
  { title: 'Chính sách Phòng chống Rửa tiền', titleEn: 'AML Policy', updated: '2024-03-10' },
  { title: 'Quy chế Giao dịch Có liên quan', titleEn: 'Related Party Transaction Policy', updated: '2025-01-15' },
  { title: 'Chính sách Ứng cử viên HĐQT', titleEn: 'Board Nomination Policy', updated: '2024-01-20' },
  { title: 'Báo cáo Giao dịch Cổ đông Lớn 2024', titleEn: 'Substantial Shareholder Report 2024', updated: '2025-01-30' },
];

export default function GovernancePage() {
  const [selectedMember, setSelectedMember] = useState(boardMembers[0]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <section className="bg-navy-deep text-white py-12">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Quản Trị Công Ty</h1>
          <p className="text-sm text-vab-primary-fixed-dim">Cấu trúc quản trị, chính sách và minh bạch</p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        {/* Board of Directors */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Users className="text-vab-primary" size={24} />
            Ban Lãnh Đạo
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Member List */}
            <div className="card overflow-hidden">
              <div className="bg-vab-primary px-4 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Hội Đồng Quản Trị</h3>
              </div>
              {boardMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 transition-colors ${selectedMember.id === member.id ? 'bg-primary-50' : 'hover:bg-gray-50'}`}
                >
                  <p className="text-sm font-semibold text-on-surface">{member.name}</p>
                  <p className="text-xs text-on-surface-variant">{member.position}</p>
                </button>
              ))}
            </div>

            {/* Member Detail */}
            <div className="card p-6 lg:col-span-2">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-headline text-xl font-bold text-vab-primary">
                    {selectedMember.name.split(' ').slice(-1)[0][0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">{selectedMember.name}</h3>
                  <p className="text-sm text-vab-primary font-medium">{selectedMember.position}</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{selectedMember.bio}</p>
            </div>
          </div>
        </section>

        {/* Committee Structure */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <Shield className="text-vab-primary" size={24} />
            Cơ Cấu Ủy Ban
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Ủy Ban Kiểm Toán', nameEn: 'Audit Committee', desc: 'Giám sát báo cáo tài chính, kiểm toán nội bộ, và hệ thống kiểm soát', members: 3 },
              { name: 'Ủy Ban Nhân Sự', nameEn: 'HR &amp; Remuneration Committee', desc: 'Nhân sự cấp cao, chính sách lương, và phát triển đội ngũ', members: 3 },
              { name: 'Ủy Ban Quản Lý Rủi Ro', nameEn: 'Risk Management Committee', desc: 'Chiến lược rủi ro, giới hạn tín dụng, và quản lý danh mục', members: 4 },
              { name: 'Ủy Ban ESG', nameEn: 'ESG Committee', desc: 'Chiến lược bền vững, mục tiêu ESG, và báo cáo tác động', members: 3, href: '/esg' },
            ].map(committee => committee.href ? (
              <Link key={committee.name} href={committee.href} className="card card-hover p-5 block">
                <h3 className="font-headline text-sm font-semibold text-vab-primary mb-2">{committee.name}</h3>
                <p className="text-xs text-on-surface-variant mb-3">{committee.desc}</p>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{committee.members} thành viên</span>
              </Link>
            ) : (
              <div key={committee.name} className="card p-5">
                <h3 className="font-headline text-sm font-semibold text-vab-primary mb-2">{committee.name}</h3>
                <p className="text-xs text-on-surface-variant mb-3">{committee.desc}</p>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{committee.members} thành viên</span>
              </div>
            ))}
          </div>
        </section>

        {/* Policies & Documents */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-vab-primary mb-6 flex items-center gap-2">
            <FileText className="text-vab-primary" size={24} />
            Chính Sách & Tài Liệu
          </h2>
          <div className="card overflow-hidden">
            {governanceDocs.map((doc, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${i !== governanceDocs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <FileText className="text-vab-primary flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-medium text-on-surface">{doc.title}</p>
                    <p className="text-xs text-on-surface-variant">{doc.titleEn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 hidden md:block">{doc.updated}</span>
                  <a href="#" className="text-xs font-semibold text-data-blue hover:text-vab-primary transition-colors flex items-center gap-1">
                    <Download size={12} /> PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Whistleblowing */}
        <section className="card border-l-4 border-secondary p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="text-secondary" size={22} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-secondary mb-2">Kênh Tố Cáo Bảo Mật</h3>
              <p className="text-sm text-on-surface-variant mb-3 max-w-2xl">
                Bảo vệ quyền lợi cổ đông thiểu số và báo cáo hành vi vi phạm. Tất cả báo cáo được mã hóa, bảo mật danh tính, và ghi nhận trong audit log bất biến.
              </p>
              <button className="btn btn-secondary text-secondary">
                Gửi Báo Cáo Bảo Mật
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
