import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { FrameworkController } from './framework.controller';
import { FrameworkEntity, FrameworkSchema } from './framework.entity';
import { FrameworkService } from './services';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role';
import { PermissionModule } from '../permission';

@Module({
  imports: [
    AuthModule,
    RoleModule,
    PermissionModule,
    MongooseModule.forFeature([{ name: FrameworkEntity.name, schema: FrameworkSchema }]),
  ],
  providers: [FrameworkService],
  controllers: [FrameworkController],
  exports: [FrameworkService],
})
export class FrameworkModule {}
