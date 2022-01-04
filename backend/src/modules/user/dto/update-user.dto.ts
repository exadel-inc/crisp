import { IsArray, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

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

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: [new Types.ObjectId(), new Types.ObjectId()] })
  public readonly projects?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'Granted permissions for particular user.' })
  public readonly grants?: string[];
}
