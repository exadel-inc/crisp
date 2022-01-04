import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageController } from './page.controller';
import { PageEntity, PageSchema } from './page.entity';
import { PageService } from './services';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: PageEntity.name, schema: PageSchema }])],
  providers: [PageService],
  controllers: [PageController],
  exports: [PageService],
})
export class PageModule {}
