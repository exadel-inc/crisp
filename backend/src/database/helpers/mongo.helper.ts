import { Logger } from '@nestjs/common';
import { retryOperation } from './retry.helper';
import { retryOption } from '../constants';
import * as mongoose from 'mongoose';
import { ConfigService } from 'src/config';

export class MongoHelper {
  private readonly logger: Logger = new Logger();
  private readonly configService: ConfigService;

  private tryToConnect: boolean;
  private connectionUrl: string;
  private mongoConfig: Record<string, boolean | number>;

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.tryToConnect = this.configService.get('MONGODB_TRY_TO_CONNECT');
    this.connectionUrl = this.configService.get('MONGODB_CONNECTION_URL');
    this.mongoConfig = {
      useNewUrlParser: this.configService.get('MONGODB_USE_NEW_URL_PARSER'),
      useUnifiedTopology: this.configService.get('MONGODB_USE_UNIFIED_TOPOLOGY'),
      socketTimeoutMS: this.configService.get('MONGODB_SOCKET_TIMEOUT_MS'),
    };
    this.setMongodbEvents();
  }

  private async setMongodbEvents() {
    mongoose.connection.on('connected', () => {
      this.tryToConnect = true;

      this.logger.warn(`MongoDB connected at url: ${this.connectionUrl}`);
    });

    mongoose.connection.on('disconnected', async () => {
      this.logger.error(`MongoDB disconnected connection at url: ${this.connectionUrl}`);

      await this.connectToMongodb();
    });

    mongoose.connection.on('reconnected', () => {
      this.logger.log(`MongoDB reconnected at url: ${this.connectionUrl}`);
    });

    mongoose.connection.on('error', (error: Error) => {
      if (process.env.NODE_ENV === 'development') {
        this.logger.warn(
          `MongoDB error at url: ${this.connectionUrl}. Error: ${error.message}. Stack: ${error.stack}}`,
        );
      } else {
        this.logger.error(
          `MongoDB error at url: ${this.connectionUrl}. Error: ${error.message}. Stack: ${error.stack}}`,
        );
      }
      mongoose.disconnect();
    });
  }

  async connectToMongodb(): Promise<void> {
    try {
      if (this.tryToConnect) {
        this.tryToConnect = false;

        await retryOperation(async () => {
          return this.tryToConnectToMongodb();
        }, retryOption);
      }
    } catch (error) {
      this.logger.error(
        `MongoDB error at url: ${this.connectionUrl}. Error: ${error.message}. Stack: ${error.stack}}`,
      );
      process.exit(1);
    }
  }

  private async tryToConnectToMongodb() {
    return mongoose.connect(this.connectionUrl, this.mongoConfig);
  }
}

export const connectToMongo = async (configService: ConfigService): Promise<MongoHelper> => {
  const mongoHelper = new MongoHelper(configService);
  await mongoHelper.connectToMongodb();
  return mongoHelper;
};
