export class Token {
  id: string;

  type: string;
}

export const enum TokenType {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
  ApiToken = "api_token",
}
