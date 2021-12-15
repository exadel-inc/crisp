import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { ConfigService } from 'src/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_CONNECTION_URL'),
        useNewUrlParser: configService.get('MONGODB_USE_NEW_URL_PARSER'),
        useUnifiedTopology: configService.get('MONGODB_USE_UNIFIED_TOPOLOGY'),
        maxPoolSize: configService.get('MONGODB_CONNECTION_POOL_MAX'),
        minPoolSize: configService.get('MONGODB_CONNECTION_POOL_MIN'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
