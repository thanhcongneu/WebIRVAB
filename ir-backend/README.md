# VietABank IR Backend

Investor Relations Management API for VietABank.

## Tech Stack

- Runtime: Node.js 20 LTS
- Language: TypeScript 5+
- Framework: NestJS 10
- Database: PostgreSQL 16
- ORM: TypeORM
- Cache: Redis (ioredis)
- Auth: JWT + bcrypt
- Validation: class-validator
- API Docs: Swagger/OpenAPI

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 16
- Redis (optional, for queue)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env
# Edit .env with your database credentials

# 3. Create database
createdb ir_db

# 4. Run migrations (auto-sync in dev mode)
# The seed script will create tables automatically

# 5. Seed initial data
npm run seed

# 6. Start development server
npm run start:dev
```

The API will be available at `http://localhost:3001/api/v1`

Swagger documentation: `http://localhost:3001/api-docs`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment |
| `PORT` | 3001 | Server port |
| `DB_HOST` | localhost | PostgreSQL host |
| `DB_PORT` | 5432 | PostgreSQL port |
| `DB_NAME` | ir_db | Database name |
| `DB_USER` | postgres | Database user |
| `DB_PASSWORD` | postgres | Database password |
| `REDIS_URL` | redis://localhost:6379 | Redis URL |
| `JWT_SECRET` | - | JWT signing secret |
| `JWT_EXPIRES_IN` | 15m | Access token expiry |
| `JWT_REFRESH_EXPIRES_IN` | 7d | Refresh token expiry |

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/login | Login with email/password |
| POST | /auth/refresh | Refresh access token |

### Disclosures
| Method | Path | Description |
|--------|------|-------------|
| GET | /disclosures | List with filters |
| GET | /disclosures/:id | Get one |
| POST | /disclosures | Create (maker/admin) |
| PATCH | /disclosures/:id | Update (checker/approver/admin) |
| DELETE | /disclosures/:id | Soft delete (admin) |

### KPIs
| Method | Path | Description |
|--------|------|-------------|
| GET | /kpis | List all |
| GET | /kpis/:id | Get one |

### Events
| Method | Path | Description |
|--------|------|-------------|
| GET | /events | List with filters |
| GET | /events/:id | Get one |

### Board
| Method | Path | Description |
|--------|------|-------------|
| GET | /board | List all board members |
| GET | /board/:id | Get one |

### Stocks
| Method | Path | Description |
|--------|------|-------------|
| GET | /stocks | Current stock data (public) |
| GET | /stocks/historical | Historical prices (public) |

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Login Credentials (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@vietabank.com.vn | Admin123! |
| Maker | maker@vietabank.com.vn | Maker123! |
| Checker | checker@vietabank.com.vn | Checker123! |
| Approver | approver@vietabank.com.vn | Approver123! |

## Scripts

```bash
npm run start:dev       # Development server with hot reload
npm run build           # Build for production
npm run start:prod      # Run production build
npm run seed            # Seed database with initial data
npm run lint            # Lint and fix
npm run test            # Run unit tests
npm run test:cov        # Run with coverage
npm run test:e2e        # Run E2E tests
```

## Project Structure

```
src/
├── main.ts                     # Application entry point
├── app.module.ts               # Root module
├── config/configuration.ts     # Environment config
├── common/                    # Shared utilities
│   ├── decorators/            # Custom decorators
│   ├── entities/              # Base entity
│   ├── filters/               # Exception filters
│   └── interceptors/          # Request/response interceptors
├── auth/                      # Authentication module
├── users/                     # User management
├── disclosures/               # Disclosure/CMS module
├── kpis/                      # KPI metrics
├── events/                    # Events module
├── board/                     # Board members
├── stocks/                    # Stock data (mocked)
├── workflow-history/          # Workflow audit trail
└── seeds/                     # Database seed scripts
```

## Database

The database schema is auto-managed by TypeORM. In development, `synchronize: true` is enabled. In production, use migrations.

### Create a migration
```bash
npm run typeorm migration:generate -- src/migrations/AddNewColumn -d src/data-source.ts
```

### Run migrations
```bash
npm run migration:run
```

## Workflow Roles

| Role | Create | Update | Delete | Publish |
|------|--------|--------|--------|---------|
| maker | Yes | Yes | No | No |
| checker | No | Yes | No | No |
| approver | No | Yes | No | Yes |
| admin | Yes | Yes | Yes | Yes |
| auditor | No | No | No | No |
