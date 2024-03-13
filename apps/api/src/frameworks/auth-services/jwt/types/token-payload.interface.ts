export interface AccessTokenPayload {
  sub: string;
  rti: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
  exp: number;
}

export interface ApiTokenPayload {
  sub: string;
  jti: string;
  scope: string;
}
