export type DisclosureCategory =
  | 'quarterly_results'
  | 'annual_report'
  | 'extraordinary'
  | 'agm'
  | 'esg'
  | 'bond'
  | 'governance'
  | 'other';

export type DisclosureStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';
export type DisclosureLanguage = 'vi' | 'en' | 'both';

export interface Disclosure {
  id: string;
  title: string;
  titleEn: string;
  category: DisclosureCategory;
  status: DisclosureStatus;
  language: DisclosureLanguage;
  publishDate: string;
  year: number;
  quarter?: string;
  pdfUrl: string;
  signedUrl?: string;
  summary: string;
  summaryEn: string;
  regulator?: string;
}

export interface KPIMetric {
  id: string;
  name: string;
  nameEn: string;
  value: string;
  unit: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  period: string;
}

export interface QuarterlyResult {
  quarter: string;
  year: number;
  totalAssets: string;
  netProfit: string;
  nim: string;
  npl: string;
  car: string;
  pressReleaseUrl?: string;
  presentationUrl?: string;
  dataPackUrl?: string;
}

export interface StockData {
  symbol: string;
  exchange: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  high52w: string;
  low52w: string;
}

export interface Event {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  type: 'earnings' | 'agm' | 'investor_day' | 'webcast' | 'conference';
  status: 'upcoming' | 'live' | 'past';
  replayUrl?: string;
}

export interface BoardMember {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  imageUrl?: string;
  bio: string;
  bioEn: string;
}

export interface ESGMetric {
  category: string;
  categoryEn: string;
  metric: string;
  metricEn: string;
  value: string;
  year: number;
}

export type WorkflowRole = 'maker' | 'checker' | 'approver' | 'admin' | 'auditor';
export type WorkflowState = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export interface CMSDisclosure {
  id: string;
  title: string;
  titleEn: string;
  category: DisclosureCategory;
  status: WorkflowState;
  language: DisclosureLanguage;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  content: string;
  contentEn: string;
  pdfUrl: string;
  workflowHistory: WorkflowHistoryEntry[];
}

export interface WorkflowHistoryEntry {
  id: string;
  action: WorkflowState;
  actor: string;
  role: WorkflowRole;
  timestamp: string;
  comment?: string;
}
