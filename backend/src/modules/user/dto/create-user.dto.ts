import { IsArray, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { setValidationMessage } from 'src/common/helpers';

export class CreateUserDto {
  @IsString()
  @MinLength(5, {
    message: setValidationMessage('Username should be more than'),
  })
  @MaxLength(20, {
    message: setValidationMessage('Username should be less than'),
  })
  @ApiProperty({ example: 'Bob Brown' })
  public readonly username: string;

  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'jake@jake.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ example: 'password' })
  public readonly password: string;

  @IsArray()
  @ApiProperty({ example: [new Types.ObjectId(), new Types.ObjectId()] })
  public readonly roles: Types.ObjectId[];
}
