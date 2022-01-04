import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatternDataEntity, PatternDataSchema } from './pattern-data.entity ';
import { PatternController } from './pattern.controller';
import { PatternEntity, PatternSchema } from './pattern.entity';
import { PatternDataService, PatternService } from './services';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role';
import { PermissionModule } from '../permission';

@Module({
  imports: [
    AuthModule,
    RoleModule,
    PermissionModule,
    MongooseModule.forFeature([
      { name: PatternEntity.name, schema: PatternSchema },
      { name: PatternDataEntity.name, schema: PatternDataSchema },
    ]),
  ],
  providers: [PatternService, PatternDataService],
  controllers: [PatternController],
  exports: [PatternService, PatternDataService],
})
export class PatternModule {}
