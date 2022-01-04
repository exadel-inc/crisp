import { Logger } from '@nestjs/common';
import { ConfigService } from 'src/config';
import { MigrationModel } from './migration-model';
import { MigrationModelInterface } from './interfaces';
import { connectToMongo } from './helpers';

class MongoDbMigrationStore {
  private readonly logger = new Logger(MongoDbMigrationStore.name);

  private readonly migrationModel: typeof MigrationModel;
  private readonly configService: ConfigService;
  private readonly mongodbUri: string;
  private connected: boolean;

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.mongodbUri = this.configService.get('MONGODB_CONNECTION_URL');
    this.connected = this.configService.get('MONGODB_CONNECTED');
    this.migrationModel = MigrationModel;
  }

  async connect(): Promise<MongoDbMigrationStore> {
    try {
      await connectToMongo(this.configService);
      this.connected = true;
    } catch (err) {
      this.connected = false;
      this.logger.error(err);
      process.exit(1);
    }
    return this;
  }

  async load(cb: any): Promise<any> {
    try {
      if (!this.connected) {
        await this.connect();
      }

      let migration: any = await this.migrationModel.findOne();

      if (!migration) {
        migration = {};
      }

      return cb(null, migration);
    } catch (err) {
      this.logger.error(err.message, err);
      return cb(err);
    }
  }

  async save(set: MigrationModelInterface, cb: any) {
    try {
      if (!this.connected) {
        await this.connect();
      }
      let migration = await this.migrationModel.findOne().exec();
      if (!migration) {
        migration = await this.migrationModel.create(set);
        return cb(null, migration);
      }

      migration.set('lastRun', set.lastRun);
      migration.markModified('lastRun');
      migration.set('migrations', set.migrations);
      migration.markModified('migrations');
      migration = await migration.save();
      return cb(null, migration);
    } catch (e) {
      this.logger.error(e.message, e);
      return cb(e);
    }
  }
}

export default MongoDbMigrationStore;
