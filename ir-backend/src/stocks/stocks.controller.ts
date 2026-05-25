import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StocksService } from './stocks.service';
import { Public } from '@/common/decorators/public.decorator';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class HistoricalQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(7)
  @Max(365)
  days?: number = 365;
}

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get current stock data' })
  @ApiResponse({ status: 200, description: 'Current stock data' })
  async getCurrent() {
    return this.stocksService.getCurrent();
  }

  @Public()
  @Get('historical')
  @ApiOperation({ summary: 'Get historical stock prices' })
  @ApiResponse({ status: 200, description: 'Historical price data' })
  async getHistorical(@Query() query: HistoricalQueryDto) {
    return this.stocksService.getHistorical(query.days);
  }
}
