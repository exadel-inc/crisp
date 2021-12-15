import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { join } from 'path';

import { ConfigMode } from './interfaces/config.interface';

/**
 * Configuration service
 */
@Injectable()
export class ConfigService {
  /**
   * Configuration service constructor
   * DotEnv config
   */
  constructor() {
    const { error } = config({ path: `.env.${process.env.NODE_ENV}` });
    if (error) throw error;
  }

  /**
   * Method to get the path to a directory or file in this directory based on an environment variable
   * @param  key      The key in the environment variable object must be a string
   * @param  filename The file name for a specific directory must be string, is optional
   * @return          Returns the absolute path to a file or directory as a string
   */
  public getDest(key: string, filename?: string): string {
    filename = process.env[filename] || filename || '/';
    return join(process.cwd(), this.get(key), filename);
  }

  /**
   * Method for checking application operating modes
   * @param  mode The mode to be checked must be enum modes in ConfigMode
   * @return     Returns the boolean value
   */
  public getMode(mode: ConfigMode): boolean {
    return process.env['NODE_ENV'] === mode;
  }

  /**
   * Method for getting the value of a variable in the environment
   * @param  key The key in the environment variable object must be a string
   * @return     Returns the generated type limited the function types JSON.parse()
   */
  public get<T = NodeJS.ProcessEnv>(key: string): T {
    const variable = process.env[key];
    if (!variable) throw TypeError(`The ${key} cannot be undefined`);
    try {
      return JSON.parse(variable);
    } catch {
      return <T>(<unknown>variable);
    }
  }
}
