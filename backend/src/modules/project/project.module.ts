import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectEntity, ProjectSchema } from './project.entity';
import { ProjectService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role';
import { PermissionModule } from '../permission';

@Module({
  imports: [
    AuthModule,
    RoleModule,
    PermissionModule,
    MongooseModule.forFeature([{ name: ProjectEntity.name, schema: ProjectSchema }]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
