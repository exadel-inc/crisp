import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateResourceDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'framework' })
  public readonly name: string;

  @IsString()
  @IsArray()
  @ApiProperty({ example: [new Types.ObjectId(), new Types.ObjectId()] })
  public readonly permissions: Types.ObjectId[];
}
