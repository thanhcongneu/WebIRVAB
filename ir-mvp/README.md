# VietABank IR Website MVP

Website Quan hệ Nhà đầu tư (Investor Relations) cho ngân hàng thương mại cổ phần niêm yết.

## Yêu cầu hệ thống

- **Node.js 20+** — [Tải tại đây](https://nodejs.org/)
- npm hoặc yarn

## Cài đặt

```bash
cd ir-mvp
npm install
```

## Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

## Cấu trúc trang

| Route | Mô tả |
|-------|-------|
| `/` | Homepage — Hero, KPI, Stock widget, Disclosures, Events |
| `/financials` | Thông tin tài chính, KPI dashboard, bảng dữ liệu lịch sử |
| `/stock` | Thông tin cổ phiếu, biểu đồ, cơ cấu cổ đông |
| `/disclosures` | Trung tâm công bố thông tin — tìm kiếm, lọc, tải PDF |
| `/governance` | Quản trị công ty, ban lãnh đạo, chính sách |
| `/esg` | ESG & Phát triển bền vững |
| `/events` | Lịch sự kiện, archive webcasts |
| `/agm` | Trung tâm cổ đông, tài liệu ĐHĐCĐ |
| `/admin` | CMS Admin — quản lý công bố, workflow, users, audit log |

## CMS Workflow (Maker-Checker-Approver)

- **Maker**: Tạo & gửi công bố
- **Checker**: Rà soát nội dung
- **Approver**: Phê duyệt & xuất bản
- **Admin**: Quản lý hệ thống
- **Auditor**: Xem audit log (chỉ đọc)

## Design System

Tuân thủ design system **"Institutional Excellence"**:
- Colors: Navy (#002d68), Red (#bb0014), Status colors
- Typography: Hanken Grotesk (headlines) + IBM Plex Sans (body)
- Spacing: 8px base unit, 1200px max container

## Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Data**: Mock data (production sẽ kết nối API)
