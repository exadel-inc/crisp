import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({ example: 'user' })
  public readonly name: string;

  @IsString()
  @ApiProperty({ example: 'user permission description' })
  public readonly description: string;
}
