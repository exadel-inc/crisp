import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { ConfigModule } from './config';

import { AuthModule } from './modules/auth';
import { UserModule } from './modules/user';

@Module({
  imports: [DatabaseModule, ConfigModule, AuthModule, UserModule],
})
export class AppModule {}
