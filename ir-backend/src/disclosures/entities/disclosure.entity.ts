import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from '@/users/entities/user.entity';

export enum DisclosureCategory {
  QUARTERLY_RESULTS = 'quarterly_results',
  ANNUAL_REPORT = 'annual_report',
  EXTRAORDINARY = 'extraordinary',
  AGM = 'agm',
  ESG = 'esg',
  BOND = 'bond',
  GOVERNANCE = 'governance',
  OTHER = 'other',
}

export enum DisclosureStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum DisclosureLanguage {
  VI = 'vi',
  EN = 'en',
  BOTH = 'both',
}

@Entity('disclosures')
@Index('idx_disclosures_category', ['category'])
@Index('idx_disclosures_status', ['status'])
@Index('idx_disclosures_year', ['year'])
@Index('idx_disclosures_publish_date', ['publishDate'])
export class Disclosure extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ name: 'title_en', type: 'varchar', length: 500, nullable: true })
  titleEn: string | null;

  @Column({ type: 'enum', enum: DisclosureCategory })
  category: DisclosureCategory;

  @Column({ type: 'enum', enum: DisclosureStatus, default: DisclosureStatus.DRAFT })
  status: DisclosureStatus;

  @Column({ type: 'enum', enum: DisclosureLanguage, default: DisclosureLanguage.BOTH })
  language: DisclosureLanguage;

  @Column({ name: 'publish_date', type: 'date' })
  publishDate: string;

  @Column({ type: 'int' })
  @Index()
  year: number;

  @Column({ type: 'varchar', length: 5, nullable: true })
  quarter: string | null;

  @Column({ name: 'pdf_url', type: 'varchar', length: 1000 })
  pdfUrl: string;

  @Column({ name: 'signed_url', type: 'varchar', length: 1000, nullable: true })
  signedUrl: string | null;

  @Column({ type: 'text' })
  summary: string;

  @Column({ name: 'summary_en', type: 'text', nullable: true })
  summaryEn: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  regulator: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  version: string | null;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @Column({ name: 'content_en', type: 'text', nullable: true })
  contentEn: string | null;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdById: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User | null;
}
