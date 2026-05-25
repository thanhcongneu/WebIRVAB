import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('board_members')
export class BoardMember extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'name_en', type: 'varchar', length: 255, nullable: true })
  nameEn: string | null;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @Column({ name: 'position_en', type: 'varchar', length: 255, nullable: true })
  positionEn: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ name: 'bio_en', type: 'text', nullable: true })
  bioEn: string | null;

  @Column({ name: 'image_url', type: 'varchar', length: 1000, nullable: true })
  imageUrl: string | null;
}
