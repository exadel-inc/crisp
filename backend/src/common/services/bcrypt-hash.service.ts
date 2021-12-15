import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashService {
  private static readonly HASH_SALT = 10;

  public async compareUserPassword(
    passwordToCompare: string,
    userPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordToCompare, userPassword);
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BcryptHashService.HASH_SALT);
  }
}
