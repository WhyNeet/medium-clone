import { Token, TokenType } from "@/core/entities/token.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenFactoryService {
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

    return token;
  }
}
