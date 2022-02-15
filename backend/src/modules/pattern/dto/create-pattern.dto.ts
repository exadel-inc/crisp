import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PatternType } from 'src/common/enums';
import { setValidationMessage } from 'src/common/helpers';

export class CreatePatternDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Pattern name should be more than'),
  })
  @MaxLength(200, {
    message: setValidationMessage('Pattern name should be less than'),
  })
  @ApiProperty({ example: 'given closed all but the first tab' })
  public readonly name: string;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Pattern name should be more than'),
  })
  @MaxLength(200, {
    message: setValidationMessage('Pattern name should be less than'),
  })
  @ApiProperty({ example: 'Given I have closed all but the first tab' })
  public readonly script: string;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Pattern name should be more than'),
  })
  @MaxLength(200, {
    message: setValidationMessage('Pattern name should be less than'),
  })
  @ApiProperty({ example: PatternType.ACTION })
  public readonly type: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly frameworkId: Types.ObjectId;
}
