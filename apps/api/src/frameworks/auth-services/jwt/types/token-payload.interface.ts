export interface AccessTokenPayload {
  sub: string;
  rti: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}
