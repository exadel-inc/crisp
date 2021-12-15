import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from 'src/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  private static readonly configService = new ConfigService();

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: JwtConfigService.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: JwtConfigService.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    };
  }
}
