import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, WithSecretOrKey } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AccessTokenPayload } from "../types/token-payload.interface";
import { CookiesExtractorService } from "../extractors/cookies-extractor.service";
import { TokenUser } from "../types/token-user.interface";
import { TokenException } from "@/features/exception/exceptions/token.exception";
import { TokenType } from "@/core/entities/token.entity";
import { TokenService } from "../services/token.service";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "access-token",
) {
  constructor(
    private tokenService: TokenService,
    configService: ConfigService,
    cookiesExtractorService: CookiesExtractorService,
  ) {
    const options: WithSecretOrKey = {
      jwtFromRequest: cookiesExtractorService.tokenExtractor(
        TokenType.AccessToken,
      ),
      ignoreExpiration: false,
      algorithms: ["HS256"],
      secretOrKey: configService.get<string>("JWT_SECRET"),
    };

    super(options);
  }

  public async validate(payload: AccessTokenPayload): Promise<TokenUser> {
    if (typeof payload.sub !== "string" || typeof payload.rti !== "string")
      throw new TokenException.InvalidAccessTokenProvided();

    const isValidToken = await this.tokenService.checkTokenId(payload.rti);
    if (!isValidToken) throw new TokenException.InvalidAccessTokenProvided();

    return { id: payload.sub, jti: payload.rti };
  }
}
