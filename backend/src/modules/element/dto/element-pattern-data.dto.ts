import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

class CustomVarsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://en.wikipedia.org' })
  public readonly url?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Lorem ipsum' })
  public readonly text?: string;
}

export class ElementPatternDataDto {
  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly id?: Types.ObjectId;

  @ApiProperty({ example: new CustomVarsDto() })
  @ValidateNested({ each: true })
  @Type(() => CustomVarsDto)
  public readonly customVars: CustomVarsDto;

  constructor(id: Types.ObjectId, customVars: CustomVarsDto) {
    this.id = id;
    this.customVars = customVars;
  }
}
