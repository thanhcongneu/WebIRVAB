import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disclosure, DisclosureStatus } from './entities/disclosure.entity';
import {
  CreateDisclosureDto,
  UpdateDisclosureDto,
  ListDisclosuresDto,
} from './dto/disclosure.dto';
import { UserRole } from '@/users/entities/user.entity';

@Injectable()
export class DisclosuresService {
  private readonly logger = new Logger(DisclosuresService.name);

  constructor(
    @InjectRepository(Disclosure)
    private readonly disclosureRepository: Repository<Disclosure>,
  ) {}

  async findAll(query: ListDisclosuresDto) {
    const {
      page = 1,
      limit = 20,
      year,
      category,
      language,
      keyword,
      status,
      sortBy = 'publishDate',
      order = 'DESC',
    } = query;

    const qb = this.disclosureRepository
      .createQueryBuilder('d')
      .select([
        'd.id',
        'd.title',
        'd.titleEn',
        'd.category',
        'd.status',
        'd.language',
        'd.publishDate',
        'd.year',
        'd.quarter',
        'd.pdfUrl',
        'd.signedUrl',
        'd.summary',
        'd.summaryEn',
        'd.regulator',
        'd.version',
        'd.createdAt',
        'd.updatedAt',
      ]);

    if (year) {
      qb.andWhere('d.year = :year', { year });
    }

    if (category) {
      qb.andWhere('d.category = :category', { category });
    }

    if (language) {
      qb.andWhere('d.language = :language', { language });
    }

    if (status) {
      qb.andWhere('d.status = :status', { status });
    }

    if (keyword) {
      qb.andWhere(
        '(LOWER(d.title) LIKE :keyword OR LOWER(d.titleEn) LIKE :keyword OR LOWER(d.summary) LIKE :keyword OR LOWER(d.summaryEn) LIKE :keyword)',
        { keyword: `%${keyword.toLowerCase()}%` },
      );
    }

    const validSortFields = ['publishDate', 'year', 'createdAt', 'updatedAt', 'title'];
    const sortField = validSortFields.includes(sortBy) ? `d.${sortBy}` : 'd.publishDate';
    qb.orderBy(sortField, order);

    const total = await qb.getCount();
    const data = await qb
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Disclosure> {
    const disclosure = await this.disclosureRepository.findOne({ where: { id } });
    if (!disclosure) {
      throw new NotFoundException('Disclosure not found');
    }
    return disclosure;
  }

  async create(
    dto: CreateDisclosureDto,
    userId: string,
  ): Promise<Disclosure> {
    const disclosure = this.disclosureRepository.create({
      ...dto,
      createdById: userId,
      status: dto.status || DisclosureStatus.DRAFT,
    });

    const saved = await this.disclosureRepository.save(disclosure);

    this.logger.log(JSON.stringify({
      event: 'disclosure.created',
      disclosureId: saved.id,
      userId,
    }));

    return saved;
  }

  async update(
    id: string,
    dto: UpdateDisclosureDto,
    userId: string,
    userRole: UserRole,
  ): Promise<Disclosure> {
    const disclosure = await this.findById(id);

    // Role-based update permission
    if (userRole === UserRole.MAKER || userRole === UserRole.AUDITOR) {
      throw new ForbiddenException('You do not have permission to update disclosures');
    }

    Object.assign(disclosure, dto);
    const updated = await this.disclosureRepository.save(disclosure);

    this.logger.log(JSON.stringify({
      event: 'disclosure.updated',
      disclosureId: id,
      userId,
    }));

    return updated;
  }

  async remove(id: string, userRole: UserRole): Promise<void> {
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete disclosures');
    }

    const disclosure = await this.findById(id);
    await this.disclosureRepository.softRemove(disclosure);

    this.logger.log(JSON.stringify({
      event: 'disclosure.deleted',
      disclosureId: id,
    }));
  }
}
