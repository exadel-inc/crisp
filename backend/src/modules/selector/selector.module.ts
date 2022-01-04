import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PermissionModule } from '../permission';
import { RoleModule } from '../role';
import { SelectorService } from '../selector/services';
import { SelectorController } from './selector.controller';
import { SelectorEntity, SelectorSchema } from './selector.entity';

@Module({
  imports: [
    AuthModule,
    RoleModule,
    PermissionModule,
    MongooseModule.forFeature([{ name: SelectorEntity.name, schema: SelectorSchema }]),
  ],
  providers: [SelectorService],
  controllers: [SelectorController],
  exports: [SelectorService],
})
export class SelectorModule {}
