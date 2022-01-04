import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreatePageDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'Wikipedia homepage' })
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'Wiki' })
  public readonly name: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly projectId: Types.ObjectId;
}
