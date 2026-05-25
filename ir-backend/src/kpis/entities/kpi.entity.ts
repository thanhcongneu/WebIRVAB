import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

export enum ChangeType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

@Entity('kpis')
export class Kpi extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'name_en', type: 'varchar', length: 255 })
  nameEn: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  value: string;

  @Column({ type: 'varchar', length: 50 })
  unit: string;

  @Column({ type: 'varchar', length: 100 })
  change: string;

  @Column({ name: 'change_type', type: 'enum', enum: ChangeType })
  changeType: ChangeType;

  @Column({ type: 'varchar', length: 50 })
  period: string;
}
