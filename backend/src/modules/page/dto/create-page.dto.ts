import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { setValidationMessage } from 'src/common/helpers';

export class CreatePageDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Page description should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Page description should be less than'),
  })
  @ApiProperty({ example: 'Wikipedia homepage' })
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Page name should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Page name should be less than'),
  })
  @ApiProperty({ example: 'Wiki' })
  public readonly name: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly projectId: Types.ObjectId;
}
