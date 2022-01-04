import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services';
import { UserEntity, UserSchema } from './user.entity';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../auth/jwt-config.service';
import { ConfigService } from 'src/config';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    RoleModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    JwtModule.registerAsync({ useClass: JwtConfigService, inject: [ConfigService] }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
