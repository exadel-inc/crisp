import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfigService } from './jwt-config.service';
import { ConfigService } from 'src/config';
import { UserModule } from '../user';
import { BcryptHashService } from '../../common/services';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    JwtModule.registerAsync({ useClass: JwtConfigService, inject: [ConfigService] }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BcryptHashService],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
