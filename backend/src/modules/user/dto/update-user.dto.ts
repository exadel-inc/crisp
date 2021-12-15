import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsOptional()
  @ApiProperty({ example: 'Bob Brown' })
  public readonly username?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'jake@jake.com' })
  public readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'refreshToken' })
  public readonly currentHashedRefreshToken?: string;
}
