import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowHistory } from './entities/workflow-history.entity';

@Injectable()
export class WorkflowHistoryService {
  constructor(
    @InjectRepository(WorkflowHistory)
    private readonly workflowRepository: Repository<WorkflowHistory>,
  ) {}

  async findByDisclosureId(disclosureId: string): Promise<WorkflowHistory[]> {
    return this.workflowRepository.find({
      where: { disclosureId },
      relations: ['actor'],
      order: { timestamp: 'DESC' },
    });
  }

  async create(data: {
    disclosureId: string;
    action: string;
    actorId: string;
    role: string;
    comment?: string;
  }): Promise<WorkflowHistory> {
    const entry = this.workflowRepository.create({
      ...data,
      timestamp: new Date(),
    });
    return this.workflowRepository.save(entry);
  }
}
