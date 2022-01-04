import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { RoleEntity } from '../../modules/role/role.entity';
import * as mongoose from 'mongoose';
import { ProjectEntity } from '../project/project.entity';

@Schema()
export class UserEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  public username: string;

  @ApiProperty({ maxLength: 50 })
  @Prop({ unique: true })
  public email: string;

  @ApiProperty({ example: 'password' })
  @Prop({ type: String, required: true })
  public password: string;

  @ApiProperty({ example: 'refreshToken' })
  @Prop({ type: String })
  public currentHashedRefreshToken: string;

  @ApiProperty({
    type: [Types.ObjectId],
    description: 'Role Mongo Ids',
  })
  @Prop({ type: Types.ObjectId, ref: RoleEntity.name })
  public roles: RoleEntity[];

  @ApiProperty({
    type: [Types.ObjectId],
    description: 'Project Mongo Ids',
  })
  @Prop({ type: Types.ObjectId, ref: ProjectEntity.name, default: [] })
  public projects: ProjectEntity[];

  @ApiProperty({
    type: [String],
    description: 'Granted Permissions For Particular User',
  })
  @Prop({ type: [String], default: [] })
  public grants: string[];
}

export interface UserEntityWithId extends UserEntity {
  readonly _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export const UserModel = mongoose.model(UserEntity.name, UserSchema);
