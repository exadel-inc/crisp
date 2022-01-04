import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from '../role/services';
import { RoleEntity, RoleSchema } from './role.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoleEntity.name, schema: RoleSchema }])],
  providers: [RoleService],
  controllers: [],
  exports: [RoleService],
})
export class RoleModule {}
