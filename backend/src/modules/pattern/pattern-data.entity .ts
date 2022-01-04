import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { PatternEntity } from './pattern.entity';

@Schema()
export class PatternDataEntity {
  @ApiProperty({
    type: Types.ObjectId,
    description: 'Pattern Mongo Id',
  })
  @Prop({ type: Types.ObjectId, ref: PatternEntity.name })
  public id: Types.ObjectId;

  @ApiProperty({
    type: Object,
    description: 'Pattern Data',
  })
  @Prop({ type: Object })
  public customVars: {
    [key: string]: string | undefined;
  };
}

export interface PatternDataEntityWithId extends PatternDataEntity {
  readonly _id: Types.ObjectId;
}

export const PatternDataSchema = SchemaFactory.createForClass(PatternDataEntity);

export const PatternDataModel = mongoose.model(PatternDataEntity.name, PatternDataSchema);
