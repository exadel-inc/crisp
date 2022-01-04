#!/usr/bin/env node
import * as migrate from 'migrate';
import { Logger } from '@nestjs/common';
import { ConfigService } from 'src/config';
import MongoDbMigrationStore from './mongo-migration-store';

const direction = process.argv[2];
const migrationName = process.argv[3];

const configService = new ConfigService();
const logger = new Logger();

const store = new MongoDbMigrationStore(configService);

store.connect().then(async () => {
  await migrate.load(
    {
      stateStore: store,
      migrationsDirectory: `${__dirname}/migrations`,
      filterFunction: (file: any) => {
        return !/\.js\.map/.test(file);
      },
    },
    (err: any, set: any) => {
      set.on('migration', (m: any) => logger.error(m.title));
      if (err) {
        throw err;
      }

      set.on('warning', (m: string) => {
        logger.error(m);
        process.exit(1);
      });

      set.migrate(direction, migrationName, (err: Error) => {
        if (err) {
          logger.error(err.message, JSON.stringify(err));
          throw err;
        }
        logger.error('Done!');
        process.exit(0);
      });
    },
  );
});

process.on('unhandledRejection', (reason) => {
  logger.error(`unhandledRejection': ${reason})`);
  process.exit(1);
});
