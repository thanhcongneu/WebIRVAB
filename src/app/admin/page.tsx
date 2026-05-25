'use client';

import { useState } from 'react';
import {
  LayoutDashboard, FileText, Upload, Users, Shield, Settings,
  BarChart3, Search, Bell, LogOut, Plus, Eye, Edit, Trash2,
  CheckCircle, XCircle, Clock, Send, ArrowRight, ChevronDown,
  Download, Filter, History, AlertTriangle
} from 'lucide-react';
import { categoryLabels } from '@/data/ir-data';
import type { DisclosureCategory, WorkflowState, WorkflowRole } from '@/types';
import clsx from 'clsx';

type Tab = 'dashboard' | 'disclosures' | 'workflow' | 'users' | 'audit' | 'settings';

interface AdminDisclosure {
  id: string;
  title: string;
  category: DisclosureCategory;
  status: WorkflowState;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  currentRole: WorkflowRole;
  publishDate: string;
  views: number;
  downloads: number;
}

const mockDisclosures: AdminDisclosure[] = [
  { id: 'd001', title: 'Báo Cáo Tài Chính Quý 3/2025 Đã Soát Xét', category: 'quarterly_results', status: 'published', createdAt: '2025-10-25', updatedAt: '2025-10-28', createdBy: 'Nguyễn Văn A', currentRole: 'maker', publishDate: '2025-10-28', views: 1240, downloads: 320 },
  { id: 'd002', title: 'Nghị Quyết ĐHĐCĐ Thường Niên 2025', category: 'agm', status: 'published', createdAt: '2025-04-10', updatedAt: '2025-04-15', createdBy: 'Trần Thị B', currentRole: 'maker', publishDate: '2025-04-15', views: 890, downloads: 210 },
  { id: 'd003', title: 'Báo Cáo Thường Niên 2024', category: 'annual_report', status: 'approved', createdAt: '2025-03-15', updatedAt: '2025-03-20', createdBy: 'Nguyễn Văn A', currentRole: 'checker', publishDate: '', views: 0, downloads: 0 },
  { id: 'd004', title: 'CBTT Về Giao Dịch Cổ Đông Lớn', category: 'governance', status: 'review', createdAt: '2025-09-10', updatedAt: '2025-09-12', createdBy: 'Lê Đình C', currentRole: 'checker', publishDate: '', views: 0, downloads: 0 },
  { id: 'd005', title: 'Báo Cáo ESG 2024', category: 'esg', status: 'draft', createdAt: '2025-05-10', updatedAt: '2025-05-15', createdBy: 'Phạm Thị D', currentRole: 'maker', publishDate: '', views: 0, downloads: 0 },
  { id: 'd006', title: 'CBTT Phát Hành Trái Phiếu Thứ Ba', category: 'bond', status: 'published', createdAt: '2025-08-05', updatedAt: '2025-08-10', createdBy: 'Nguyễn Văn A', currentRole: 'maker', publishDate: '2025-08-10', views: 560, downloads: 145 },
];

const auditLog = [
  { id: 'a001', actor: 'Nguyễn Văn A', role: 'maker', action: 'Tạo mới', target: 'Báo Cáo Tài Chính Q3/2025', timestamp: '2025-10-25 09:15', ip: '10.0.1.50' },
  { id: 'a002', actor: 'Trần Thị B', role: 'checker', action: 'Gửi duyệt', target: 'Báo Cáo Tài Chính Q3/2025', timestamp: '2025-10-26 14:30', ip: '10.0.1.55' },
  { id: 'a003', actor: 'Lê Văn C', role: 'approver', action: 'Phê duyệt', target: 'Báo Cáo Tài Chính Q3/2025', timestamp: '2025-10-27 10:00', ip: '10.0.1.60' },
  { id: 'a004', actor: 'Nguyễn Văn A', role: 'maker', action: 'Xuất bản', target: 'Báo Cáo Tài Chính Q3/2025', timestamp: '2025-10-28 08:30', ip: '10.0.1.50' },
  { id: 'a005', actor: 'Trần Thị B', role: 'maker', action: 'Tạo mới', target: 'Báo Cáo ESG 2024', timestamp: '2025-05-10 11:00', ip: '10.0.1.55' },
  { id: 'a006', actor: 'Hệ thống', role: 'system', action: 'Cảnh báo SLA', target: 'CBTT Giao Dịch Cổ Đông', timestamp: '2025-09-15 17:00', ip: 'system' },
];

const statusConfig: Record<WorkflowState, { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: 'Bản nháp', color: 'bg-surface-container text-on-surface-variant border-outline', icon: <Edit size={12} /> },
  review: { label: 'Đang duyệt', color: 'bg-status-warning/10 text-status-warning border-status-warning', icon: <Clock size={12} /> },
  approved: { label: 'Đã duyệt', color: 'bg-data-blue/10 text-data-blue border-data-blue', icon: <CheckCircle size={12} /> },
  published: { label: 'Đã xuất bản', color: 'bg-status-positive/10 text-status-positive border-status-positive', icon: <CheckCircle size={12} /> },
  archived: { label: 'Lưu trữ', color: 'bg-tertiary-container text-on-tertiary-container border-outline', icon: <History size={12} /> },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('disclosures');
  const [currentUser, setCurrentUser] = useState<{ name: string; role: WorkflowRole }>({ name: 'Nguyễn Văn A', role: 'maker' });
  const [selectedDisclosure, setSelectedDisclosure] = useState<AdminDisclosure | null>(null);
  const [workflowAction, setWorkflowAction] = useState<'submit' | 'approve' | 'reject' | 'publish' | null>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Tổng quan', icon: <LayoutDashboard size={18} /> },
    { id: 'disclosures', label: 'Công bố', icon: <FileText size={18} /> },
    { id: 'workflow', label: 'Phê duyệt', icon: <Shield size={18} /> },
    { id: 'users', label: 'Người dùng', icon: <Users size={18} /> },
    { id: 'audit', label: 'Audit Log', icon: <History size={18} /> },
    { id: 'settings', label: 'Cài đặt', icon: <Settings size={18} /> },
  ];

  const handleWorkflow = (d: AdminDisclosure, action: typeof workflowAction) => {
    setSelectedDisclosure(d);
    setWorkflowAction(action);
  };

  return (
    <div className="min-h-screen bg-surface-dim flex">
      {/* Sidebar */}
      <aside className="w-56 bg-surface-container-lowest border-r border-outline-variant flex flex-col flex-shrink-0">
        <div className="px-4 py-4 border-b border-outline-variant">
          <p className="font-headline text-base font-bold text-vab-primary">CMS Admin</p>
          <p className="text-[10px] text-gray-400 mt-0.5">VietABank IR Platform v1.0</p>
        </div>
        <nav className="flex-1 py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                activeTab === tab.id
                  ? 'bg-vab-primary/10 text-vab-primary font-bold border-r-2 border-vab-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        {/* User info */}
        <div className="p-4 border-t border-outline-variant">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-vab-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-vab-primary">{currentUser.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-on-surface truncate">{currentUser.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">{currentUser.role}</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 text-xs text-on-surface-variant hover:text-vab-primary transition-colors">
            <LogOut size={12} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="font-headline text-lg font-bold text-vab-primary capitalize">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <button className="relative text-on-surface-variant hover:text-vab-primary transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 bg-status-positive rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Tổng công bố', value: '248', change: '+12', icon: <FileText size={20} className="text-vab-primary" /> },
                { label: 'Chờ duyệt', value: '3', change: '!', icon: <Clock size={20} className="text-status-warning" />, urgent: true },
                { label: 'Tổng lượt tải', value: '12,450', change: '+8%', icon: <Download size={20} className="text-data-blue" /> },
                { label: 'Người dùng', value: '24', change: '+2', icon: <Users size={20} className="text-status-positive" /> },
              ].map(stat => (
                <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-on-surface-variant">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <p className="font-headline text-2xl font-bold text-on-surface">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.urgent ? 'text-status-warning font-bold' : 'text-gray-400'}`}>{stat.change} tháng này</p>
                </div>
              ))}
            </div>
          )}

          {/* Disclosures List */}
          {activeTab === 'disclosures' && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input type="text" placeholder="Tìm kiếm..." className="pl-9 pr-4 py-2 text-sm border border-outline rounded bg-surface focus:outline-none focus:border-vab-primary w-64" />
                  </div>
                  <select className="px-3 py-2 text-sm border border-outline rounded bg-surface focus:outline-none focus:border-vab-primary">
                    <option>Tất cả trạng thái</option>
                    <option>Bản nháp</option>
                    <option>Đang duyệt</option>
                    <option>Đã duyệt</option>
                    <option>Đã xuất bản</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-vab-primary text-white text-sm font-bold rounded hover:bg-vab-primary-container transition-colors">
                  <Plus size={16} /> Tạo mới
                </button>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-vab-primary text-white">
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">#</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Tiêu đề</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden md:table-cell">Loại</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden lg:table-cell">Trạng thái</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden lg:table-cell">Cập nhật</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider w-40">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50">
                    {mockDisclosures.map(d => {
                      const sc = statusConfig[d.status];
                      return (
                        <tr key={d.id} className="hover:bg-surface-container-low transition-colors">
                          <td className="px-4 py-3 text-xs text-gray-400 font-medium">{d.id}</td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-on-surface line-clamp-1">{d.title}</p>
                            <p className="text-[10px] text-gray-400">Tạo bởi: {d.createdBy}</p>
                          </td>
                          <td className="px-4 py-3 text-xs text-on-surface-variant hidden md:table-cell">
                            {categoryLabels[d.category]?.vi || d.category}
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${sc.color}`}>
                              {sc.icon} {sc.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">{d.updatedAt}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 hover:bg-surface-container-high rounded text-gray-400 hover:text-vab-primary transition-colors" title="Xem">
                                <Eye size={14} />
                              </button>
                              <button className="p-1.5 hover:bg-surface-container-high rounded text-gray-400 hover:text-vab-primary transition-colors" title="Sửa">
                                <Edit size={14} />
                              </button>
                              {/* Workflow Actions */}
                              {d.status === 'draft' && currentUser.role === 'maker' && (
                                <button
                                  onClick={() => handleWorkflow(d, 'submit')}
                                  className="p-1.5 hover:bg-status-warning/10 rounded text-gray-400 hover:text-status-warning transition-colors"
                                  title="Gửi duyệt"
                                >
                                  <Send size={14} />
                                </button>
                              )}
                              {d.status === 'review' && (currentUser.role === 'checker' || currentUser.role === 'approver') && (
                                <>
                                  <button
                                    onClick={() => handleWorkflow(d, 'approve')}
                                    className="p-1.5 hover:bg-status-positive/10 rounded text-gray-400 hover:text-status-positive transition-colors"
                                    title="Phê duyệt"
                                  >
                                    <CheckCircle size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleWorkflow(d, 'reject')}
                                    className="p-1.5 hover:bg-secondary/10 rounded text-gray-400 hover:text-secondary transition-colors"
                                    title="Từ chối"
                                  >
                                    <XCircle size={14} />
                                  </button>
                                </>
                              )}
                              {d.status === 'approved' && currentUser.role === 'approver' && (
                                <button
                                  onClick={() => handleWorkflow(d, 'publish')}
                                  className="p-1.5 hover:bg-status-positive/10 rounded text-gray-400 hover:text-status-positive transition-colors"
                                  title="Xuất bản"
                                >
                                  <ArrowRight size={14} />
                                </button>
                              )}
                              {d.status === 'published' && (
                                <button className="p-1.5 hover:bg-surface-container-high rounded text-gray-400 hover:text-vab-primary transition-colors" title="Hủy xuất bản">
                                  <History size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Workflow */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
                <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Quy Trình Phê Duyệt</h3>
                <div className="flex items-center gap-2 mb-6">
                  {(['draft', 'review', 'approved', 'published'] as WorkflowState[]).map((state, i) => (
                    <div key={state} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${state === 'review' ? 'bg-status-warning/10 border-status-warning text-status-warning' : state === 'approved' ? 'bg-data-blue/10 border-data-blue text-data-blue' : state === 'published' ? 'bg-status-positive/10 border-status-positive text-status-positive' : 'bg-surface-container border-outline text-gray-400'}`}>
                          <span className="text-[10px] font-bold">{i + 1}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{statusConfig[state].label}</span>
                      </div>
                      {i < 3 && <div className="w-16 h-0.5 bg-outline mx-1 mt-[-20px]" />}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4">
                    <h4 className="text-sm font-bold text-vab-primary mb-2">Maker</h4>
                    <p className="text-xs text-on-surface-variant">Tạo mới, chỉnh sửa và gửi công bố lên hệ thống. Không có quyền xuất bản.</p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4">
                    <h4 className="text-sm font-bold text-vab-primary mb-2">Checker</h4>
                    <p className="text-xs text-on-surface-variant">Rà soát nội dung, soạn thảo, và đề xuất phê duyệt hoặc từ chối.</p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4">
                    <h4 className="text-sm font-bold text-vab-primary mb-2">Approver</h4>
                    <p className="text-xs text-on-surface-variant">Phê duyệt cuối cùng và xuất bản công bố lên website.</p>
                  </div>
                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4">
                    <h4 className="text-sm font-bold text-vab-primary mb-2">Admin</h4>
                    <p className="text-xs text-on-surface-variant">Quản lý người dùng, cài đặt hệ thống, và giám sát toàn bộ workflow.</p>
                  </div>
                </div>
              </div>

              {/* Pending items */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
                <div className="px-5 py-3 border-b border-outline-variant bg-status-warning/5">
                  <h3 className="font-headline text-sm font-bold text-status-warning flex items-center gap-2">
                    <AlertTriangle size={16} /> Cần xử lý ({mockDisclosures.filter(d => d.status === 'review').length})
                  </h3>
                </div>
                {mockDisclosures.filter(d => d.status === 'review').map(d => (
                  <div key={d.id} className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/50 hover:bg-surface-container-low transition-colors">
                    <div>
                      <p className="text-sm font-medium text-on-surface">{d.title}</p>
                      <p className="text-xs text-gray-400">{d.createdBy} · {d.updatedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-status-positive text-white text-xs font-bold rounded hover:bg-status-positive/90 transition-colors">
                        <CheckCircle size={12} className="inline mr-1" /> Duyệt
                      </button>
                      <button className="px-3 py-1.5 border border-outline text-on-surface-variant text-xs font-bold rounded hover:border-secondary hover:text-secondary transition-colors">
                        <XCircle size={12} className="inline mr-1" /> Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === 'users' && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-5 py-4 border-b border-outline-variant">
                <h3 className="font-headline text-sm font-bold text-vab-primary">Quản lý người dùng</h3>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-vab-primary text-white text-xs font-bold rounded hover:bg-vab-primary-container transition-colors">
                  <Plus size={12} /> Thêm người dùng
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Người dùng</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Vai trò</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden lg:table-cell">Trạng thái</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider w-24">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {[
                    { name: 'Nguyễn Văn A', role: 'maker', email: 'nvana@vietabank.com', status: 'active' },
                    { name: 'Trần Thị B', role: 'maker', email: 'ttb@vietabank.com', status: 'active' },
                    { name: 'Lê Đình C', role: 'checker', email: 'ldc@vietabank.com', status: 'active' },
                    { name: 'Phạm Văn D', role: 'approver', email: 'pvd@vietabank.com', status: 'active' },
                    { name: 'Admin Hệ thống', role: 'admin', email: 'admin@vietabank.com', status: 'active' },
                    { name: 'Kiểm toán viên', role: 'auditor', email: 'audit@vietabank.com', status: 'active' },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-vab-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-vab-primary">{user.name[0]}</span>
                        </div>
                        <span className="text-sm font-medium text-on-surface">{user.name}</span>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className="px-2 py-0.5 bg-vab-primary/10 text-vab-primary font-bold uppercase tracking-wider rounded text-[10px]">{user.role}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant hidden md:table-cell">{user.email}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-1 text-xs text-status-positive font-bold">
                          <span className="w-2 h-2 bg-status-positive rounded-full" /> {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-surface-container-high rounded text-gray-400 hover:text-vab-primary transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-secondary/10 rounded text-gray-400 hover:text-secondary transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Audit Log */}
          {activeTab === 'audit' && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-5 py-4 border-b border-outline-variant">
                <h3 className="font-headline text-sm font-bold text-vab-primary">Nhật ký hoạt động (Immutable)</h3>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-outline text-on-surface-variant text-xs font-bold rounded hover:border-vab-primary hover:text-vab-primary transition-colors">
                  <Download size={12} /> Xuất CSV
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-vab-primary text-white">
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">#</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Người thực hiện</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden md:table-cell">Hành động</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden lg:table-cell">Mục tiêu</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Thời gian</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider hidden sm:table-cell">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {auditLog.map(log => (
                    <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-400">{log.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-on-surface">{log.actor}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{log.role}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.action === 'Phê duyệt' ? 'bg-status-positive/10 text-status-positive' : log.action === 'Từ chối' ? 'bg-secondary/10 text-secondary' : log.action === 'Gửi duyệt' ? 'bg-status-warning/10 text-status-warning' : 'bg-surface-container text-on-surface-variant'}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-on-surface-variant hidden lg:table-cell">{log.target}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{log.timestamp}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400 hidden sm:table-cell">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
                <h3 className="font-headline text-lg font-bold text-vab-primary mb-4">Cài đặt Hệ thống</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">Tên ngân hàng</label>
                      <input type="text" defaultValue="VietABank" className="w-full px-3 py-2.5 text-sm border border-outline rounded bg-surface focus:outline-none focus:border-vab-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">Mã chứng khoán</label>
                      <input type="text" defaultValue="VAB" className="w-full px-3 py-2.5 text-sm border border-outline rounded bg-surface focus:outline-none focus:border-vab-primary" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">Sàn giao dịch</label>
                      <select className="w-full px-3 py-2.5 text-sm border border-outline rounded bg-surface focus:outline-none focus:border-vab-primary">
                        <option>HOSE</option>
                        <option>HNX</option>
                        <option>UPCOM</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-on-surface">MFA Bắt buộc</p>
                        <p className="text-xs text-on-surface-variant">Yêu cầu xác thực 2 yếu tố cho tất cả người dùng CMS</p>
                      </div>
                      <div className="w-12 h-6 bg-vab-primary rounded-full p-0.5 cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full ml-auto" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-on-surface">SLA Cảnh báo</p>
                        <p className="text-xs text-on-surface-variant">Cảnh báo khi công bố quá hạn xuất bản</p>
                      </div>
                      <div className="w-12 h-6 bg-vab-primary rounded-full p-0.5 cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full ml-auto" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-on-surface">Audit Log Bất biến</p>
                        <p className="text-xs text-on-surface-variant">Không cho phép sửa/xóa nhật ký hoạt động</p>
                      </div>
                      <div className="w-12 h-6 bg-vab-primary rounded-full p-0.5 cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant">
                  <button className="px-6 py-2.5 bg-vab-primary text-white text-sm font-bold rounded hover:bg-vab-primary-container transition-colors">
                    Lưu cài đặt
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Workflow Modal */}
      {selectedDisclosure && workflowAction && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-outline-variant">
              <h3 className="font-headline text-lg font-bold text-vab-primary">Xác nhận hành động</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-on-surface mb-2">
                <strong>{selectedDisclosure.title}</strong>
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Hành động: <span className="font-bold text-vab-primary uppercase">{workflowAction === 'submit' ? 'Gửi duyệt' : workflowAction === 'approve' ? 'Phê duyệt' : workflowAction === 'reject' ? 'Từ chối' : 'Xuất bản'}</span>
              </p>
              <textarea
                placeholder="Ghi chú (tùy chọn)..."
                className="w-full px-3 py-2.5 text-sm border border-outline rounded bg-surface focus:outline-none focus:border-vab-primary resize-none h-20 mb-4"
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => { setSelectedDisclosure(null); setWorkflowAction(null); }}
                  className="px-4 py-2 border border-outline text-on-surface-variant text-sm font-bold rounded hover:bg-surface-container-low transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => { setSelectedDisclosure(null); setWorkflowAction(null); }}
                  className="px-4 py-2 bg-vab-primary text-white text-sm font-bold rounded hover:bg-vab-primary-container transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
