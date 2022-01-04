import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MigrationInterface, MigrationModelInterface } from './interfaces';
import * as mongoose from 'mongoose';

@Schema()
export class MigrationEntity implements MigrationModelInterface {
  @ApiProperty()
  @Prop({ required: true })
  public lastRun: string;

  @ApiProperty()
  @Prop({ required: true })
  public migrations: MigrationInterface[];
}

export const MigrationSchema = SchemaFactory.createForClass(MigrationEntity);

export const MigrationModel = mongoose.model('_migrations', MigrationSchema);
