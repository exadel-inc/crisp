import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PatternModule } from '../pattern';
import { SelectorModule } from '../selector';
import { ElementController } from './element.controller';
import { ElementEntity, ElementSchema } from './element.entity';
import { ElementService } from './services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SelectorModule,
    PatternModule,
    MongooseModule.forFeature([{ name: ElementEntity.name, schema: ElementSchema }]),
  ],
  providers: [ElementService],
  controllers: [ElementController],
  exports: [ElementService],
})
export class ElementModule {}
