import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import {
  User,
  UserRole,
} from '../users/entities/user.entity';
import {
  Disclosure,
  DisclosureCategory,
  DisclosureStatus,
  DisclosureLanguage,
} from '../disclosures/entities/disclosure.entity';
import { Kpi, ChangeType } from '../kpis/entities/kpi.entity';
import { Event, EventType, EventStatus } from '../events/entities/event.entity';
import { BoardMember } from '../board/entities/board-member.entity';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ir_db',
  entities: [User, Disclosure, Kpi, Event, BoardMember],
  synchronize: true,
  logging: false,
});

async function seed() {
  console.log('Connecting to database...');
  await dataSource.initialize();
  console.log('Database connected.');

  const userRepo = dataSource.getRepository(User);
  const disclosureRepo = dataSource.getRepository(Disclosure);
  const kpiRepo = dataSource.getRepository(Kpi);
  const eventRepo = dataSource.getRepository(Event);
  const boardRepo = dataSource.getRepository(BoardMember);

  // Clear existing data
  console.log('Clearing existing data...');
  await disclosureRepo.delete({});
  await kpiRepo.delete({});
  await eventRepo.delete({});
  await boardRepo.delete({});
  await userRepo.delete({});

  // ===== Users =====
  console.log('Seeding users...');
  const adminUser = userRepo.create({
    email: 'admin@vietabank.com.vn',
    password: await bcrypt.hash('Admin123!', 12),
    name: 'Admin User',
    role: UserRole.ADMIN,
    isActive: true,
  });
  await userRepo.save(adminUser);

  const makerUser = userRepo.create({
    email: 'maker@vietabank.com.vn',
    password: await bcrypt.hash('Maker123!', 12),
    name: 'Maker User',
    role: UserRole.MAKER,
    isActive: true,
  });
  await userRepo.save(makerUser);

  const checkerUser = userRepo.create({
    email: 'checker@vietabank.com.vn',
    password: await bcrypt.hash('Checker123!', 12),
    name: 'Checker User',
    role: UserRole.CHECKER,
    isActive: true,
  });
  await userRepo.save(checkerUser);

  const approverUser = userRepo.create({
    email: 'approver@vietabank.com.vn',
    password: await bcrypt.hash('Approver123!', 12),
    name: 'Approver User',
    role: UserRole.APPROVER,
    isActive: true,
  });
  await userRepo.save(approverUser);

  // ===== Disclosures =====
  console.log('Seeding disclosures...');
  const disclosures = [
    {
      title: 'Báo Cáo Tài Chính Quý 3/2025 Đã Soát Xét',
      titleEn: 'Reviewed Financial Statements Q3/2025',
      category: DisclosureCategory.QUARTERLY_RESULTS,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-10-28',
      year: 2025,
      quarter: 'Q3',
      pdfUrl: '#',
      summary: 'Báo cáo tài chính Quý 3 năm 2025 đã được soát xét bởi PwC Việt Nam.',
      summaryEn: 'Q3 2025 financial statements reviewed by PwC Vietnam.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
    {
      title: 'Nghị Quyết ĐHĐCĐ Thường Niên 2025',
      titleEn: 'Annual General Meeting Resolution 2025',
      category: DisclosureCategory.AGM,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-04-15',
      year: 2025,
      pdfUrl: '#',
      summary: 'Nghị quyết Đại hội đồng cổ đông thường niên năm 2025.',
      summaryEn: 'Annual General Meeting resolution for fiscal year 2025.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
    {
      title: 'Báo Cáo Thường Niên 2024',
      titleEn: 'Annual Report 2024',
      category: DisclosureCategory.ANNUAL_REPORT,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-03-28',
      year: 2024,
      pdfUrl: '#',
      summary: 'Báo cáo thường niên năm 2024 trình ĐHĐCĐ phê duyệt.',
      summaryEn: 'Annual report for fiscal year 2024 submitted for AGM approval.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
    {
      title: 'CBTT Về Giao Dịch Cổ Đông Lớn',
      titleEn: 'Disclosure on Related Party Transaction',
      category: DisclosureCategory.GOVERNANCE,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-09-15',
      year: 2025,
      pdfUrl: '#',
      summary: 'Công bố thông tin về giao dịch cổ đông lớn theo quy định.',
      summaryEn: 'Disclosure on substantial shareholder transaction per regulatory requirements.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
    {
      title: 'Báo Cáo ESG 2024',
      titleEn: 'ESG Report 2024',
      category: DisclosureCategory.ESG,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-05-20',
      year: 2024,
      pdfUrl: '#',
      summary: 'Báo cáo ESG năm 2024 theo tiêu chuẩn GRI, TCFD.',
      summaryEn: '2024 ESG report aligned with GRI and TCFD frameworks.',
      createdById: adminUser.id,
    },
    {
      title: 'CBTT Phát Hành Trái Phiếu Thứ Ba',
      titleEn: 'Third Tranche Bond Issuance Disclosure',
      category: DisclosureCategory.BOND,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-08-10',
      year: 2025,
      pdfUrl: '#',
      summary: 'Công bố thông tin về đợt phát hành trái phiếu thứ ba năm 2025.',
      summaryEn: 'Disclosure on third tranche corporate bond issuance 2025.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
    {
      title: 'Kết Quả Kinh Doanh Quý 2/2025',
      titleEn: 'Q2/2025 Business Results',
      category: DisclosureCategory.QUARTERLY_RESULTS,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-07-25',
      year: 2025,
      quarter: 'Q2',
      pdfUrl: '#',
      summary: 'Kết quả kinh doanh Quý 2 năm 2025 với lợi nhuận tăng trưởng 8.2%.',
      summaryEn: 'Q2 2025 business results with 8.2% profit growth YoY.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
    {
      title: 'CBTT Bất Thường - Thay Đổi Nhân Sự Cấp Cao',
      titleEn: 'Extraordinary Disclosure - Senior Management Change',
      category: DisclosureCategory.EXTRAORDINARY,
      status: DisclosureStatus.PUBLISHED,
      language: DisclosureLanguage.BOTH,
      publishDate: '2025-06-01',
      year: 2025,
      pdfUrl: '#',
      summary: 'Thông báo bất thường về thay đổi nhân sự cấp cao theo quy định.',
      summaryEn: 'Extraordinary disclosure on senior management appointment.',
      regulator: 'SSC',
      createdById: adminUser.id,
    },
  ];

  for (const d of disclosures) {
    const disclosure = disclosureRepo.create(d);
    await disclosureRepo.save(disclosure);
  }

  // ===== KPIs =====
  console.log('Seeding KPIs...');
  const kpis = [
    {
      name: 'Tổng Tài Sản',
      nameEn: 'Total Assets',
      value: '105,432',
      unit: 'Tỷ VNĐ',
      change: '+12.4% YTD',
      changeType: ChangeType.POSITIVE,
      period: 'Q3/2025',
    },
    {
      name: 'Lợi Nhuận Sau Thuế',
      nameEn: 'Net Profit',
      value: '1,250',
      unit: 'Tỷ VNĐ',
      change: '+8.5% YoY',
      changeType: ChangeType.POSITIVE,
      period: 'Q3/2025',
    },
    {
      name: 'Biên Lãi Ròng (NIM)',
      nameEn: 'Net Interest Margin',
      value: '3.2%',
      unit: '%',
      change: '+0.15%',
      changeType: ChangeType.POSITIVE,
      period: 'Q3/2025',
    },
    {
      name: 'Tỷ Lệ Nợ Xấu (NPL)',
      nameEn: 'Non-Performing Loan Ratio',
      value: '1.8%',
      unit: '%',
      change: 'Dưới mức quy định',
      changeType: ChangeType.NEUTRAL,
      period: 'Q3/2025',
    },
    {
      name: 'Tỷ Lệ An Toàn Vốn (CAR)',
      nameEn: 'Capital Adequacy Ratio',
      value: '11.5%',
      unit: '%',
      change: 'Đạt chuẩn Basel II',
      changeType: ChangeType.POSITIVE,
      period: 'Q3/2025',
    },
    {
      name: 'ROE',
      nameEn: 'Return on Equity',
      value: '18.2%',
      unit: '%',
      change: '+1.1%',
      changeType: ChangeType.POSITIVE,
      period: 'Q3/2025',
    },
  ];

  for (const k of kpis) {
    const kpi = kpiRepo.create(k);
    await kpiRepo.save(kpi);
  }

  // ===== Events =====
  console.log('Seeding events...');
  const events = [
    {
      title: 'Họp Nhà Đầu Tư Q3/2025',
      titleEn: 'Q3/2025 Investor Meeting',
      date: '2025-11-05',
      type: EventType.EARNINGS,
      status: EventStatus.PAST,
      replayUrl: '#',
    },
    {
      title: 'Ngày Nhà Đầu Tư 2025',
      titleEn: 'Investor Day 2025',
      date: '2025-12-10',
      type: EventType.INVESTOR_DAY,
      status: EventStatus.UPCOMING,
    },
    {
      title: 'ĐHĐCĐ Thường Niên 2025',
      titleEn: 'Annual General Meeting 2025',
      date: '2025-04-15',
      type: EventType.AGM,
      status: EventStatus.PAST,
      replayUrl: '#',
    },
    {
      title: 'Họp Nhà Đầu Tư Q2/2025',
      titleEn: 'Q2/2025 Investor Meeting',
      date: '2025-08-01',
      type: EventType.EARNINGS,
      status: EventStatus.PAST,
      replayUrl: '#',
    },
  ];

  for (const e of events) {
    const event = eventRepo.create(e);
    await eventRepo.save(event);
  }

  // ===== Board Members =====
  console.log('Seeding board members...');
  const boardMembers = [
    {
      name: 'Nguyễn Văn Minh',
      nameEn: 'Nguyen Van Minh',
      position: 'Chủ Tịch HĐQT',
      positionEn: 'Chairman of Board',
      bio: 'Ông Nguyễn Văn Minh có hơn 30 năm kinh nghiệm trong lĩnh vực ngân hàng và tài chính. Trước khi gia nhập VietABank, ông từng giữ các vị trí cao cấp tại NHNN và các ngân hàng thương mại hàng đầu.',
      bioEn: 'Mr. Nguyen Van Minh brings over 30 years of experience in banking and finance. Prior to joining VietABank, he held senior positions at SBV and leading commercial banks.',
    },
    {
      name: 'Trần Thị Hương',
      nameEn: 'Tran Thi Huong',
      position: 'Tổng Giám Đốc',
      positionEn: 'Chief Executive Officer',
      bio: 'Bà Trần Thị Hương gia nhập VietABank năm 2018 với vai trò Tổng Giám Đốc. Bà có kinh nghiệm sâu rộng trong quản trị rủi ro và phát triển chiến lược ngân hàng bán lẻ.',
      bioEn: 'Ms. Tran Thi Huong joined VietABank in 2018 as CEO. She has extensive experience in risk management and retail banking strategy development.',
    },
    {
      name: 'Lê Đình Phong',
      nameEn: 'Le Dinh Phong',
      position: 'Phó Tổng Giám Đốc Tài Chính',
      positionEn: 'Chief Financial Officer',
      bio: 'Ông Lê Đình Phong phụ trách mảng tài chính với hơn 20 năm kinh nghiệm kế toán, kiểm toán và quản trị tài chính ngân hàng.',
      bioEn: 'Mr. Le Dinh Phong oversees finance with over 20 years of experience in accounting, auditing, and bank financial management.',
    },
    {
      name: 'Phạm Thị Mai Lan',
      nameEn: 'Pham Thi Mai Lan',
      position: 'Giám Đốc Khối Quản Trị Rủi Ro',
      positionEn: 'Chief Risk Officer',
      bio: 'Bà Phạm Thị Mai Lan có kinh nghiệm 18 năm trong lĩnh vực quản trị rủi ro tín dụng và vận hành tại các ngân hàng quốc tế.',
      bioEn: 'Ms. Pham Thi Mai Lan has 18 years of experience in credit and operational risk management at international banks.',
    },
  ];

  for (const b of boardMembers) {
    const member = boardRepo.create(b);
    await boardRepo.save(member);
  }

  console.log('Seed completed successfully!');
  console.log('');
  console.log('=== Login Credentials ===');
  console.log('Admin:    admin@vietabank.com.vn / Admin123!');
  console.log('Maker:    maker@vietabank.com.vn / Maker123!');
  console.log('Checker:  checker@vietabank.com.vn / Checker123!');
  console.log('Approver: approver@vietabank.com.vn / Approver123!');

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
