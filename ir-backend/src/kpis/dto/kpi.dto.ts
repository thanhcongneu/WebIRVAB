import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MaxLength, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ChangeType } from '../entities/kpi.entity';

export class CreateKpiDto {
  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  nameEn: string;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  value: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50)
  unit: string;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  change: string;

  @ApiProperty({ enum: ChangeType })
  @IsEnum(ChangeType)
  changeType: ChangeType;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @MaxLength(50)
  period: string;
}

export class UpdateKpiDto {
  @ApiPropertyOptional({ maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nameEn?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  value?: string;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  unit?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  change?: string;

  @ApiPropertyOptional({ enum: ChangeType })
  @IsEnum(ChangeType)
  @IsOptional()
  changeType?: ChangeType;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  period?: string;
}
