import { IsBoolean, IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'Demo' })
  public readonly name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ example: 'Demo Wiki project' })
  public readonly description: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  public readonly isDefault: boolean;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly frameworkId: Types.ObjectId;
}
