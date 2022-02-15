import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { setValidationMessage } from 'src/common/helpers';

export class CreateRoleDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Role name should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Role name should be less than'),
  })
  @ApiProperty({ example: 'user' })
  public readonly name: string;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Role description should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Role description should be less than'),
  })
  @ApiProperty({ example: 'user role description' })
  public readonly description: string;

  @IsString()
  @IsArray()
  @ApiProperty({ example: [new Types.ObjectId(), new Types.ObjectId()] })
  public readonly resources: [Types.ObjectId];
}
