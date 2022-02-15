import { IsBoolean, IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { setValidationMessage } from 'src/common/helpers';

export class CreateProjectDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Project name should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Project name should be less than'),
  })
  @ApiProperty({ example: 'Demo' })
  public readonly name: string;

  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Project description should be more than'),
  })
  @MaxLength(200, {
    message: setValidationMessage('Project description should be less than'),
  })
  @ApiProperty({ example: 'Demo Wiki project' })
  public readonly description: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  public readonly isDefault: boolean;

  @IsMongoId()
  @ApiProperty({ example: new Types.ObjectId() })
  public readonly frameworkId: Types.ObjectId;
}
