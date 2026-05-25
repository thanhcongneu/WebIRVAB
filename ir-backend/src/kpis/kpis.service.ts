import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kpi } from './entities/kpi.entity';
import { CreateKpiDto, UpdateKpiDto } from './dto/kpi.dto';

@Injectable()
export class KpisService {
  constructor(
    @InjectRepository(Kpi)
    private readonly kpiRepository: Repository<Kpi>,
  ) {}

  async findAll(): Promise<Kpi[]> {
    return this.kpiRepository.find({ order: { createdAt: 'ASC' } });
  }

  async findById(id: string): Promise<Kpi> {
    const kpi = await this.kpiRepository.findOne({ where: { id } });
    if (!kpi) {
      throw new NotFoundException('KPI not found');
    }
    return kpi;
  }

  async create(dto: CreateKpiDto): Promise<Kpi> {
    const kpi = this.kpiRepository.create(dto);
    return this.kpiRepository.save(kpi);
  }

  async update(id: string, dto: UpdateKpiDto): Promise<Kpi> {
    const kpi = await this.findById(id);
    Object.assign(kpi, dto);
    return this.kpiRepository.save(kpi);
  }

  async remove(id: string): Promise<void> {
    const kpi = await this.findById(id);
    await this.kpiRepository.softRemove(kpi);
  }
}
