import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { ElementSelectorsDto } from './element-selectors.dto';
import { ElementPatternDataDto } from './element-pattern-data.dto';
import { setValidationMessage } from 'src/common/helpers';

export class CreateElementDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Element name should be more than'),
  })
  @MaxLength(50, {
    message: setValidationMessage('Element name should be less than'),
  })
  @ApiProperty({ example: 'Placeholder (for steps without elements)' })
  public readonly name: string;

  @IsString()
  @MinLength(0, {
    message: setValidationMessage('Element description should be more than'),
  })
  @MaxLength(50, {
    message: setValidationMessage('Element description should be less than'),
  })
  @ApiProperty({ example: 'element desciption' })
  public readonly description: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly pageId: Types.ObjectId;

  @ValidateNested()
  @Type(() => ElementSelectorsDto)
  @ApiProperty({
    example: new ElementSelectorsDto(new Types.ObjectId(), '#searchInput', '//*[@id=searchInput]'),
  })
  public readonly selectors: ElementSelectorsDto;

  @ValidateNested()
  @ApiProperty({
    example: new ElementPatternDataDto(new Types.ObjectId('61c0ba48ee16536eca6eaa29'), {
      url: 'https://en.wikipedia.org',
    }),
  })
  @Type(() => ElementPatternDataDto)
  public readonly pageObjectPattern: ElementPatternDataDto | null;

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({
    example: [
      new ElementPatternDataDto(new Types.ObjectId('61c0ba48ee16536eca6eaa29'), {
        url: 'https://en.google.com',
      }),
    ],
  })
  @Type(() => ElementPatternDataDto)
  public readonly actionPatterns: ElementPatternDataDto[];

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  @IsOptional()
  public readonly parentElementId?: Types.ObjectId | null;
}
