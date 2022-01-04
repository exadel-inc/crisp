import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsOptional } from 'class-validator';

@Schema()
export class ProjectEntity {
  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  public name: string;

  @ApiProperty()
  @Prop({
    type: Types.ObjectId,
    required: true,
    description: 'Framework Mongo Id',
  })
  public frameworkId: Types.ObjectId;

  @ApiProperty({ maxLength: 50 })
  @Prop({ type: String, required: true })
  @IsOptional()
  public description?: string;

  @ApiProperty({ maxLength: 50 })
  @Prop({ type: Boolean, required: true })
  @IsOptional()
  public isDefault?: boolean;
}

export interface ProjectEntityWithId extends ProjectEntity {
  readonly _id: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);

export const ProjectModel = mongoose.model(ProjectEntity.name, ProjectSchema);
