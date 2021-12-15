import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop()
  public username: string;

  @ApiProperty({ maxLength: 50 })
  @Prop()
  public email: string;

  @ApiProperty({ example: 'password' })
  @Prop()
  public password: string;

  @ApiProperty({ example: 'refreshToken' })
  @Prop()
  public currentHashedRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
