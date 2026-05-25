import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateBoardMemberDto {
  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nameEn?: string;

  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  position: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  positionEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bioEn?: string;

  @ApiPropertyOptional({ maxLength: 1000 })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  imageUrl?: string;
}

export class UpdateBoardMemberDto {
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

  @ApiPropertyOptional({ maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  position?: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  positionEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bioEn?: string;

  @ApiPropertyOptional({ maxLength: 1000 })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  imageUrl?: string;
}
