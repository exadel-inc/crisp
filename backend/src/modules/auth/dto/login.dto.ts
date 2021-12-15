import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'jake@jake.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  public readonly password: string;
}
