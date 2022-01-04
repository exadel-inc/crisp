import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema()
export class FrameworkEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  public name: string;

  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  @IsOptional()
  public description?: string;
}

export interface FrameworkEntityWithId extends FrameworkEntity {
  readonly _id: Types.ObjectId;
}

export const FrameworkSchema = SchemaFactory.createForClass(FrameworkEntity);

export const FrameworkModel = mongoose.model(FrameworkEntity.name, FrameworkSchema);
