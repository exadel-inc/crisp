import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './services';
import { RegisterDto, LoginDto, LogoutDto, RefreshAccessTokenDto } from './dto';
import { ResponseSuccess, RefreshAccessTokenResponse, LoginResponse } from './auth.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiResponse({
    status: 201,
    description: 'User has been successfully registrated.',
  })
  @ApiResponse({
    status: 409,
    description: 'Validation failed.',
  })
  @ApiBody({ type: RegisterDto })
  public register(@Body(new ValidationPipe()) credentials: RegisterDto): Promise<ResponseSuccess> {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'The user successfully logged in.',
  })
  @ApiResponse({
    status: 409,
    description: 'Invalid credentials: (email), please fill in correct one.',
  })
  @ApiBody({ type: LoginDto })
  public login(@Body(new ValidationPipe()) credentials: LoginDto): Promise<LoginResponse> {
    return this.authService.login(credentials);
  }

  @Post('/logout')
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully.',
  })
  @ApiResponse({
    status: 409,
    description: 'Invalid refreshToken.',
  })
  @ApiBody({ type: LogoutDto })
  public logout(@Body(new ValidationPipe()) credentials: LogoutDto): Promise<ResponseSuccess> {
    return this.authService.logout(credentials);
  }

  @Post('/refresh-access-token')
  @ApiResponse({
    status: 200,
    description: 'New access token was generated successfully.',
  })
  @ApiResponse({
    status: 409,
    description: 'Invalid refreshToken.',
  })
  @ApiBody({ type: RefreshAccessTokenDto })
  public refreshAccessToken(
    @Body(new ValidationPipe()) credentials: RefreshAccessTokenDto,
  ): Promise<RefreshAccessTokenResponse> {
    return this.authService.refreshAccessToken(credentials.refreshToken);
  }
}
