import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { setValidationMessage } from 'src/common/helpers';

export class CreateResourceDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Resource name should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Resource name should be less than'),
  })
  @ApiProperty({ example: 'framework' })
  public readonly name: string;

  @IsString()
  @IsArray()
  @ApiProperty({ example: [new Types.ObjectId(), new Types.ObjectId()] })
  public readonly permissions: Types.ObjectId[];
}
