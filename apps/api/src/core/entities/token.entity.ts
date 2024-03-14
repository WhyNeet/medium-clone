export class Token {
  id: string;

  name?: string;

  type: TokenType;
}

export const enum TokenType {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
  ApiToken = "api_token",
}
