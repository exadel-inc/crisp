import { Types } from 'mongoose';
import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { setValidationMessage } from 'src/common/helpers';

export class CreateSelectorDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('ElementCss should be more than'),
  })
  @MaxLength(50, {
    message: setValidationMessage('ElementCss should be less than'),
  })
  @ApiProperty({ example: '#searchInput' })
  @IsOptional()
  public readonly elementCss?: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  @IsOptional()
  public readonly elementId?: Types.ObjectId;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('ElementXPath should be more than'),
  })
  @MaxLength(50, {
    message: setValidationMessage('ElementXPath should be less than'),
  })
  @ApiProperty({ example: '//*[@id=searchInput]' })
  @IsOptional()
  public readonly elementXPath?: string;
}
