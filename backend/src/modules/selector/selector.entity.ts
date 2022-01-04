import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { ElementEntity } from '../element/element.entity';

@Schema()
export class SelectorEntity {
  @ApiProperty({
    type: Types.ObjectId,
    description: 'Element Mongo Id',
  })
  @Prop({ type: Types.ObjectId, ref: ElementEntity.name })
  public elementId?: ElementEntity;

  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String })
  public elementCss?: string;

  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String })
  public elementXPath?: string;
}

export interface SelectorEntityWithId extends SelectorEntity {
  readonly _id: Types.ObjectId;
}

export const SelectorSchema = SchemaFactory.createForClass(SelectorEntity);

export const SelectorModel = mongoose.model(SelectorEntity.name, SelectorSchema);
