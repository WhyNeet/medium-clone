export interface AccessTokenPayload {
  sub: string;
  rti: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}

export interface ApiTokenPayload {
  sub: string;
  jti: string;
  scope: string;
}
