type JwtSignOptions = {
  readonly secret: string;
  readonly signOptions: {
    readonly expiresIn: string;
  };
};

export const jwtHelper = (secret: string, expiresIn: string): JwtSignOptions => ({
  secret,
  signOptions: { expiresIn },
});
