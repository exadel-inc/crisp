import { Types } from 'mongoose';
import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSelectorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: '#searchInput' })
  @IsOptional()
  public readonly elementCss?: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  @IsOptional()
  public readonly elementId?: Types.ObjectId;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: '//*[@id=searchInput]' })
  @IsOptional()
  public readonly elementXPath?: string;
}
