import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { User, UserRole } from '@/users/entities/user.entity';

export enum WorkflowAction {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('workflow_history')
@Index('idx_workflow_disclosure_id', ['disclosureId'])
@Index('idx_workflow_timestamp', ['timestamp'])
export class WorkflowHistory extends BaseEntity {
  @Column({ name: 'disclosure_id', type: 'uuid' })
  disclosureId: string;

  @Column({ type: 'enum', enum: WorkflowAction })
  action: WorkflowAction;

  @Column({ name: 'actor_id', type: 'uuid' })
  actorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'actor_id' })
  actor: User;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
