import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user';
import { ConfigService } from 'src/config';
import { RegisterDto, LoginDto, LogoutDto } from '../dto';
import {
  ResponseSuccess,
  RefreshAccessTokenResponse,
  LoginResponse,
  LogoutResponse,
} from '../auth.interface';
import { createError } from '../../../common/helpers/error-handling.helpers';
import { ErrorTypeEnum, RoleTypeEnum } from '../../../common/enums';
import { BcryptHashService } from '../../../common/services/bcrypt-hash.service';
import { TokenPayload } from '../token-payload.interface';
import { UserEntityWithId } from 'src/modules/user/user.entity';
import { Types } from 'mongoose';
import { RoleService } from 'src/modules/role';
import { secondsToHours } from 'src/common/helpers';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly bcryptHashService: BcryptHashService,
    private readonly roleService: RoleService,
  ) {}

  public async register(credentials: RegisterDto): Promise<ResponseSuccess> {
    if (await this.userService.getUserEntityByEmail(credentials.email)) {
      throw new ConflictException(createError(ErrorTypeEnum.EMAIL_ALREADY_TAKEN, 'email'));
    }
    const hashedPassword = await this.bcryptHashService.hashPassword(credentials.password);
    const userRole = await this.roleService.getRoleByName(RoleTypeEnum.USER);

    const user = await this.userService.createUser({
      ...credentials,
      password: hashedPassword,
      roles: [userRole._id],
    });
    const accessToken: string = await this.getAndGenerateJwtAccessToken(user._id);
    const refreshToken: string = await this.getAndGenerateJwtRefreshToken(user.email);
    await this.userService.setCurrentRefreshTokenAndGetUser(user._id, refreshToken);
    const expiresIn: number = secondsToHours(
      this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    );
    return { accessToken, refreshToken, expiresIn: `${expiresIn}h` };
  }

  public async login(credentials: LoginDto): Promise<LoginResponse> {
    const user: UserEntityWithId = await this.userService.getUserEntityByEmail(credentials.email);
    if (!user) {
      throw new ConflictException(createError(ErrorTypeEnum.EMAIL_DOES_NOT_EXISTS, 'email'));
    }
    if (!(await this.bcryptHashService.compareUserPassword(credentials.password, user.password))) {
      throw new ConflictException(createError(ErrorTypeEnum.PASSWORD_IS_NOT_CORRECT, 'password'));
    }
    const accessToken: string = await this.getAndGenerateJwtAccessToken(user._id);
    const refreshToken: string = await this.getAndGenerateJwtRefreshToken(user.email);
    await this.userService.setCurrentRefreshTokenAndGetUser(user._id, refreshToken);
    const expiresIn: number = secondsToHours(
      this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    );
    return { accessToken, refreshToken, expiresIn: `${expiresIn}h` };
  }

  public async logout(credentials: LogoutDto): Promise<LogoutResponse> {
    const user: UserEntityWithId = await this.userService.getUserIfRefreshTokenMatches(
      credentials.refreshToken,
    );
    await this.userService.removeRefreshToken(user._id);
    return { userId: user._id.toString() };
  }

  public async getAndGenerateJwtAccessToken(userId: Types.ObjectId): Promise<string> {
    const user: UserEntityWithId = await this.userService.getUserById(userId);
    const payload: TokenPayload = { email: user.email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
  }

  public async getAndGenerateJwtRefreshToken(email: string): Promise<string> {
    const payload: TokenPayload = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
  }

  public async refreshAccessToken(refreshToken: string): Promise<RefreshAccessTokenResponse> {
    const user: UserEntityWithId = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
    );
    try {
      await this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (err) {
      throw new ConflictException(createError(ErrorTypeEnum.INVALID_REFRESH_TOKEN, 'refreshToken'));
    }
    return { accessToken: await this.getAndGenerateJwtAccessToken(user._id) };
  }
}
