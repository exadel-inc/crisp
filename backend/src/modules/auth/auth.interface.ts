export interface AuthPayload {
  readonly username: string;
}

export interface LoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshAccessTokenResponse {
  readonly accessToken: string;
}

export interface ResponseSuccess {
  readonly result: string;
}
