import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class ElementSelectorsDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly elementId?: Types.ObjectId;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  @ApiProperty({ example: '#searchInput' })
  public readonly elementCss?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  @ApiProperty({ example: '//*[@id=searchInput]' })
  public readonly elementXPath?: string;

  constructor(elementId: Types.ObjectId, elementCss: string, elementXPath: string) {
    this.elementId = elementId;
    this.elementCss = elementCss;
    this.elementXPath = elementXPath;
  }
}
