import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

export enum EventType {
  EARNINGS = 'earnings',
  AGM = 'agm',
  INVESTOR_DAY = 'investor_day',
  WEBCAST = 'webcast',
  CONFERENCE = 'conference',
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  LIVE = 'live',
  PAST = 'past',
}

@Entity('events')
@Index('idx_events_status', ['status'])
@Index('idx_events_type', ['type'])
@Index('idx_events_date', ['date'])
export class Event extends BaseEntity {
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ name: 'title_en', type: 'varchar', length: 500, nullable: true })
  titleEn: string | null;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'enum', enum: EventType })
  type: EventType;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.UPCOMING })
  status: EventStatus;

  @Column({ name: 'replay_url', type: 'varchar', length: 1000, nullable: true })
  replayUrl: string | null;
}
