import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ example: 'Bob Brown' })
  public readonly username: string;

  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'jake@jake.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  public readonly password: string;
}
