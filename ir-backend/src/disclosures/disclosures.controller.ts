import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DisclosuresService } from './disclosures.service';
import {
  CreateDisclosureDto,
  UpdateDisclosureDto,
  ListDisclosuresDto,
} from './dto/disclosure.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('disclosures')
@Controller('disclosures')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DisclosuresController {
  constructor(private readonly disclosuresService: DisclosuresService) {}

  @Get()
  @ApiOperation({ summary: 'List disclosures with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Disclosures list' })
  async findAll(@Query() query: ListDisclosuresDto) {
    return this.disclosuresService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get disclosure by ID' })
  @ApiResponse({ status: 200, description: 'Disclosure found' })
  @ApiResponse({ status: 404, description: 'Disclosure not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.disclosuresService.findById(id);
  }

  @Post()
  @Roles('maker', 'admin')
  @ApiOperation({ summary: 'Create a new disclosure' })
  @ApiResponse({ status: 201, description: 'Disclosure created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() dto: CreateDisclosureDto,
    @CurrentUser('userId') userId: string,
  ) {
    const disclosure = await this.disclosuresService.create(dto, userId);
    return { success: true, data: disclosure };
  }

  @Patch(':id')
  @Roles('maker', 'checker', 'approver', 'admin')
  @ApiOperation({ summary: 'Update a disclosure' })
  @ApiResponse({ status: 200, description: 'Disclosure updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Disclosure not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDisclosureDto,
    @CurrentUser('userId') userId: string,
    @CurrentUser('role') userRole: string,
  ) {
    const disclosure = await this.disclosuresService.update(
      id,
      dto,
      userId,
      userRole as 'maker' | 'checker' | 'approver' | 'admin' | 'auditor',
    );
    return { success: true, data: disclosure };
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a disclosure' })
  @ApiResponse({ status: 204, description: 'Disclosure deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Disclosure not found' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('role') userRole: string,
  ) {
    await this.disclosuresService.remove(id, userRole as 'admin');
  }
}
