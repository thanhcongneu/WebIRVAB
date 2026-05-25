import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardMemberDto, UpdateBoardMemberDto } from './dto/board-member.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('board')
@Controller('board')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: 'List all board members' })
  @ApiResponse({ status: 200, description: 'Board member list' })
  async findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board member by ID' })
  @ApiResponse({ status: 200, description: 'Board member found' })
  @ApiResponse({ status: 404, description: 'Board member not found' })
  async findOne(@Param('id') id: string) {
    return this.boardService.findById(id);
  }

  @Post()
  @Roles('maker', 'admin')
  @ApiOperation({ summary: 'Create a new board member' })
  @ApiResponse({ status: 201, description: 'Board member created' })
  async create(@Body() dto: CreateBoardMemberDto) {
    const member = await this.boardService.create(dto);
    return { success: true, data: member };
  }

  @Patch(':id')
  @Roles('maker', 'checker', 'approver', 'admin')
  @ApiOperation({ summary: 'Update a board member' })
  @ApiResponse({ status: 200, description: 'Board member updated' })
  @ApiResponse({ status: 404, description: 'Board member not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateBoardMemberDto) {
    const member = await this.boardService.update(id, dto);
    return { success: true, data: member };
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a board member' })
  @ApiResponse({ status: 200, description: 'Board member deleted' })
  @ApiResponse({ status: 404, description: 'Board member not found' })
  async remove(@Param('id') id: string) {
    await this.boardService.remove(id);
    return { success: true };
  }
}
