import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ResourceService } from '../resource/services';
import { RoleModule } from '../role';
import { ResourceController } from './resource.controller';
import { ResourceEntity, ResourceSchema } from './resource.entity';

@Module({
  imports: [
    AuthModule,
    RoleModule,
    MongooseModule.forFeature([{ name: ResourceEntity.name, schema: ResourceSchema }]),
  ],
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: [ResourceService],
})
export class ResourceModule {}
