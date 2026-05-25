import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardMember } from './entities/board-member.entity';
import { CreateBoardMemberDto, UpdateBoardMemberDto } from './dto/board-member.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardMember)
    private readonly boardMemberRepository: Repository<BoardMember>,
  ) {}

  async findAll(): Promise<BoardMember[]> {
    return this.boardMemberRepository.find({ order: { createdAt: 'ASC' } });
  }

  async findById(id: string): Promise<BoardMember> {
    const member = await this.boardMemberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException('Board member not found');
    }
    return member;
  }

  async create(dto: CreateBoardMemberDto): Promise<BoardMember> {
    const member = this.boardMemberRepository.create(dto);
    return this.boardMemberRepository.save(member);
  }

  async update(id: string, dto: UpdateBoardMemberDto): Promise<BoardMember> {
    const member = await this.findById(id);
    Object.assign(member, dto);
    return this.boardMemberRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findById(id);
    await this.boardMemberRepository.softRemove(member);
  }
}
