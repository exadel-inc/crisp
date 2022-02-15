import { Controller, Post, Body, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services';
import { RegisterDto, LoginDto, LogoutDto, RefreshAccessTokenDto } from './dto';
import {
  ResponseSuccess,
  RefreshAccessTokenResponse,
  LoginResponse,
  LogoutResponse,
} from './auth.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully registrated.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Validation failed.',
  })
  @ApiBody({ type: RegisterDto })
  public register(@Body(new ValidationPipe()) credentials: RegisterDto): Promise<ResponseSuccess> {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Invalid credentials: (email), please fill in correct one.',
  })
  @ApiBody({ type: LoginDto })
  public login(@Body(new ValidationPipe()) credentials: LoginDto): Promise<LoginResponse> {
    return this.authService.login(credentials);
  }

  @Post('/logout')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged out successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Invalid refreshToken.',
  })
  @ApiBody({ type: LogoutDto })
  public logout(@Body(new ValidationPipe()) credentials: LogoutDto): Promise<LogoutResponse> {
    return this.authService.logout(credentials);
  }

  @Post('/refresh-access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New access token was generated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Invalid refreshToken.',
  })
  @ApiBody({ type: RefreshAccessTokenDto })
  public refreshAccessToken(
    @Body(new ValidationPipe()) credentials: RefreshAccessTokenDto,
  ): Promise<RefreshAccessTokenResponse> {
    return this.authService.refreshAccessToken(credentials.refreshToken);
  }
}
