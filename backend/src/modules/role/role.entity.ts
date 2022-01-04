import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { ResourceEntity } from '../resource/resource.entity';

@Schema()
export class RoleEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  public name: string;

  @ApiProperty({ maxLength: 150 })
  @Prop({ type: String, required: true })
  public description: string;

  @ApiProperty({
    type: [Types.ObjectId],
    description: 'Resource Mongo Ids',
  })
  @Prop([{ type: Types.ObjectId, ref: ResourceEntity.name }])
  public resources: ResourceEntity[];
}

export interface RoleEntityWithId extends RoleEntity {
  readonly _id: Types.ObjectId;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);

export const RoleModel = mongoose.model(RoleEntity.name, RoleSchema);
