import { Token, TokenType } from "@/core/entities/token.entity";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenFactoryService {
  private refreshTokenExpiresIn: number;

  constructor(configService: ConfigService) {
    this.refreshTokenExpiresIn = Number(
      configService.get<string>("JWT_REFRESH_TOKEN_EXPIRES_IN"),
    );
  }

  public createNewToken(type: TokenType, name?: string): Token {
    const token = new Token();

    token.type = type;
    token.name = name;

    return token;
  }

  public createNewApiToken(name: string): Token {
    const token = this.createNewToken(TokenType.ApiToken, name);

    return token;
  }

  public createNewRefreshToken(): Token {
    const token = this.createNewToken(TokenType.RefreshToken);

    const currentTime = new Date().getTime();

    // current time in millis + refresh token expiration time (converted to millis)
    token.expireAt = new Date(currentTime + this.refreshTokenExpiresIn * 1000);

    return token;
  }
}
