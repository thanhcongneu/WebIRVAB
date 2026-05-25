import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
  IsUUID,
  IsArray,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  DisclosureCategory,
  DisclosureStatus,
  DisclosureLanguage,
} from '../entities/disclosure.entity';

export class CreateDisclosureDto {
  @ApiProperty({ maxLength: 500 })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  titleEn?: string;

  @ApiProperty({ enum: DisclosureCategory })
  @IsEnum(DisclosureCategory)
  category: DisclosureCategory;

  @ApiPropertyOptional({ enum: DisclosureStatus })
  @IsEnum(DisclosureStatus)
  @IsOptional()
  status?: DisclosureStatus;

  @ApiPropertyOptional({ enum: DisclosureLanguage })
  @IsEnum(DisclosureLanguage)
  @IsOptional()
  language?: DisclosureLanguage;

  @ApiProperty()
  @IsDateString()
  publishDate: string;

  @ApiProperty()
  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @ApiPropertyOptional({ maxLength: 5 })
  @IsString()
  @IsOptional()
  @MaxLength(5)
  quarter?: string;

  @ApiProperty({ maxLength: 1000 })
  @IsString()
  @MaxLength(1000)
  pdfUrl: string;

  @ApiPropertyOptional({ maxLength: 1000 })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  signedUrl?: string;

  @ApiProperty()
  @IsString()
  summary: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  summaryEn?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  regulator?: string;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  version?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentEn?: string;
}

export class UpdateDisclosureDto {
  @ApiPropertyOptional({ maxLength: 500 })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  title?: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  titleEn?: string;

  @ApiPropertyOptional({ enum: DisclosureCategory })
  @IsEnum(DisclosureCategory)
  @IsOptional()
  category?: DisclosureCategory;

  @ApiPropertyOptional({ enum: DisclosureStatus })
  @IsEnum(DisclosureStatus)
  @IsOptional()
  status?: DisclosureStatus;

  @ApiPropertyOptional({ enum: DisclosureLanguage })
  @IsEnum(DisclosureLanguage)
  @IsOptional()
  language?: DisclosureLanguage;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  publishDate?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ maxLength: 5 })
  @IsString()
  @IsOptional()
  @MaxLength(5)
  quarter?: string;

  @ApiPropertyOptional({ maxLength: 1000 })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  pdfUrl?: string;

  @ApiPropertyOptional({ maxLength: 1000 })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  signedUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  summaryEn?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  regulator?: string;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  version?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentEn?: string;
}

export class ListDisclosuresDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;

  @ApiPropertyOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ enum: DisclosureCategory })
  @IsEnum(DisclosureCategory)
  @IsOptional()
  category?: DisclosureCategory;

  @ApiPropertyOptional({ enum: DisclosureLanguage })
  @IsEnum(DisclosureLanguage)
  @IsOptional()
  language?: DisclosureLanguage;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiPropertyOptional({ enum: DisclosureStatus })
  @IsEnum(DisclosureStatus)
  @IsOptional()
  status?: DisclosureStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortBy?: string = 'publishDate';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  order?: 'ASC' | 'DESC' = 'DESC';
}
