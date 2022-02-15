import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { setValidationMessage } from 'src/common/helpers';

export class CreatePermissionDto {
  @IsString()
  @MinLength(2, {
    message: setValidationMessage('Permission name should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Permission name should be less than'),
  })
  @ApiProperty({ example: 'user' })
  public readonly name: string;

  @IsString()
  @ApiProperty({ example: 'user permission description' })
  public readonly description: string;
}
