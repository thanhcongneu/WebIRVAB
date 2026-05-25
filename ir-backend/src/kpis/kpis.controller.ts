import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KpisService } from './kpis.service';
import { CreateKpiDto, UpdateKpiDto } from './dto/kpi.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('kpis')
@Controller('kpis')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class KpisController {
  constructor(private readonly kpisService: KpisService) {}

  @Get()
  @ApiOperation({ summary: 'List all KPIs' })
  @ApiResponse({ status: 200, description: 'KPI list' })
  async findAll() {
    return this.kpisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get KPI by ID' })
  @ApiResponse({ status: 200, description: 'KPI found' })
  @ApiResponse({ status: 404, description: 'KPI not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.kpisService.findById(id);
  }

  @Post()
  @Roles('maker', 'admin')
  @ApiOperation({ summary: 'Create a new KPI' })
  @ApiResponse({ status: 201, description: 'KPI created' })
  async create(@Body() dto: CreateKpiDto) {
    const kpi = await this.kpisService.create(dto);
    return { success: true, data: kpi };
  }

  @Patch(':id')
  @Roles('maker', 'checker', 'approver', 'admin')
  @ApiOperation({ summary: 'Update a KPI' })
  @ApiResponse({ status: 200, description: 'KPI updated' })
  @ApiResponse({ status: 404, description: 'KPI not found' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateKpiDto) {
    const kpi = await this.kpisService.update(id, dto);
    return { success: true, data: kpi };
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a KPI' })
  @ApiResponse({ status: 200, description: 'KPI deleted' })
  @ApiResponse({ status: 404, description: 'KPI not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.kpisService.remove(id);
    return { success: true };
  }
}
