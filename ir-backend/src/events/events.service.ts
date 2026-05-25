import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto, UpdateEventDto, ListEventsDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(query: ListEventsDto) {
    const { page = 1, limit = 20, status, type, year, order = 'DESC' } = query;

    const qb = this.eventRepository.createQueryBuilder('e');

    if (status) {
      qb.andWhere('e.status = :status', { status });
    }

    if (type) {
      qb.andWhere('e.type = :type', { type });
    }

    if (year) {
      qb.andWhere('EXTRACT(YEAR FROM e.date) = :year', { year });
    }

    qb.orderBy('e.date', order);

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

  async findById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const event = await this.findById(id);
    Object.assign(event, dto);
    return this.eventRepository.save(event);
  }

  async remove(id: string): Promise<void> {
    const event = await this.findById(id);
    await this.eventRepository.softRemove(event);
  }
}
