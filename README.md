# VietABank IR Platform

Nền tảng Quan hệ Nhà đầu tư của VietABank — bao gồm website public và API backend.

## Cấu trúc Monorepo

```
.
├── ir-mvp/          # Next.js 16 — Website IR public
└── ir-backend/      # NestJS 10 — REST API backend
```

## ir-mvp — Website Public (Next.js 16)

Website tĩnh cho nhà đầu tư. SEO-optimized, server-rendered.

```bash
cd ir-mvp
npm install
npm run dev      # Development
npm run build    # Production build
```

## ir-backend — REST API (NestJS 10)

Backend API cho quản lý nội dung IR. JWT auth, RBAC, PostgreSQL + TypeORM.

```bash
cd ir-backend
npm install
cp .env.example .env   # Configure database + JWT
npm run start:dev
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, TailwindCSS |
| Backend | NestJS 10, TypeORM, PostgreSQL |
| Auth | JWT + RBAC (maker/checker/approver/admin) |
| Styling | VietABank Design System v2.0 |

## API Endpoints

| Module | Base | Description |
|--------|------|-------------|
| Auth | `/api/v1/auth` | Login, JWT token |
| Disclosures | `/api/v1/disclosures` | Công bố thông tin |
| KPIs | `/api/v1/kpis` | Chỉ số tài chính |
| Events | `/api/v1/events` | Sự kiện IR |
| Board | `/api/v1/board` | BOD/BOS |
| Stocks | `/api/v1/stocks` | Dữ liệu VAB |

## Team

- **Frontend**: Next.js 16 + VietABank Design System
- **Backend**: NestJS 10 + TypeORM + PostgreSQL
- **Investor Relations**: VietABank
