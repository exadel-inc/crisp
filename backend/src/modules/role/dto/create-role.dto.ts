import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateRoleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'user' })
  public readonly name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'user role description' })
  public readonly description: string;

  @IsString()
  @IsArray()
  @ApiProperty({ example: [new Types.ObjectId(), new Types.ObjectId()] })
  public readonly resources: [Types.ObjectId];
}
