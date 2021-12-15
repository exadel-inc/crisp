import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createError } from '../../common/helpers/error-handling.helpers';
import { ErrorTypeEnum } from '../../common/enums';
import { UserService } from '../user/services/user.service';
import { ConfigService } from '../../config/config.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static readonly configService = new ConfigService();

  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: JwtStrategy.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(payload: any): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getUserEntityByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException(
        createError(ErrorTypeEnum.INVALID_JWT_TOKEN, 'authorization'),
      );
    }
    return user;
  }
}
