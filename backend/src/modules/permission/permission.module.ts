import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PermissionService } from '../permission/services';
import { PermissionEntity, PermissionSchema } from './permission.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: PermissionEntity.name, schema: PermissionSchema }]),
  ],
  providers: [PermissionService],
  controllers: [],
  exports: [PermissionService],
})
export class PermissionModule {}
