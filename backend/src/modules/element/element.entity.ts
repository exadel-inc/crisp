import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { PageEntity } from '../page/page.entity';
import { PatternEntity } from '../pattern/pattern.entity';

@Schema()
export class ElementEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String })
  public name: string;

  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String })
  public description: string;

  @ApiProperty({
    type: Types.ObjectId,
    description: 'Page Mongo Id',
  })
  @Prop({ type: Types.ObjectId, ref: PageEntity.name })
  public pageId: PageEntity;

  @ApiProperty({
    type: Types.ObjectId,
    description: 'Selector Mongo Id',
  })
  @Prop({ type: Types.ObjectId })
  public selectors: Types.ObjectId;

  @ApiProperty({
    type: Types.ObjectId,
    description: 'Object Pattern Mongo Id',
  })
  @Prop({ type: Types.ObjectId, ref: PatternEntity.name })
  public pageObjectPatternId: PatternEntity | null;

  @ApiProperty({
    type: [Types.ObjectId],
    description: 'Action Pattern Mongo Id',
  })
  @Prop({ type: Types.ObjectId, ref: PatternEntity.name })
  public actionPatternIds: PatternEntity[];

  @ApiProperty({
    type: Types.ObjectId,
    description: 'Patent Element Mongo Id',
  })
  @Prop({ type: Types.ObjectId, ref: ElementEntity.name })
  public parentElementId?: ElementEntity;
}

export interface ElementEntityWithId extends ElementEntity {
  readonly _id: Types.ObjectId;
}

export const ElementSchema = SchemaFactory.createForClass(ElementEntity);

export const ElementModel = mongoose.model(ElementEntity.name, ElementSchema);
