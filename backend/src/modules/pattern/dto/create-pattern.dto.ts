import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PatternType } from 'src/common/enums';

export class CreatePatternDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ example: 'given closed all but the first tab' })
  public readonly name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @ApiProperty({ example: 'Given I have closed all but the first tab' })
  public readonly script: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: PatternType.ACTION })
  public readonly type: string;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly frameworkId: Types.ObjectId;
}
