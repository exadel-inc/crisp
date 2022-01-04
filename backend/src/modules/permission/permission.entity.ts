import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class PermissionEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  public name: string;

  @ApiProperty({ maxLength: 150 })
  @Prop({ type: String, required: true })
  public description: string;
}

export interface PermissionEntityWithId extends PermissionEntity {
  readonly _id: Types.ObjectId;
}

export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);

export const PermissionModel = mongoose.model(PermissionEntity.name, PermissionSchema);
