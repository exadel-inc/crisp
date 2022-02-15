interface JwtOptions {
  readonly expiresIn: string;
}

export interface AuthPayload {
  readonly username: string;
}

export interface LoginResponse extends JwtOptions {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshAccessTokenResponse {
  readonly accessToken: string;
}

export interface LogoutResponse {
  readonly userId: string;
}

export interface ResponseSuccess extends JwtOptions {
  readonly accessToken: string;
  readonly refreshToken: string;
}
