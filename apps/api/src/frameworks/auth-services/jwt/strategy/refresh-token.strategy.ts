import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, WithSecretOrKey } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { RefreshTokenPayload } from "../types/token-payload.interface";
import { CookiesExtractorService } from "../extractors/cookies-extractor.service";
import { TokenUser } from "../types/token-user.interface";
import { TokenException } from "@/features/exception/exceptions/token.exception";
import { TokenType } from "@/core/entities/token.entity";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "refresh-token",
) {
  constructor(
    configService: ConfigService,
    cookiesExtractorService: CookiesExtractorService,
  ) {
    const options: WithSecretOrKey = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookiesExtractorService.tokenExtractor(TokenType.RefreshToken),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      algorithms: ["HS256"],
      secretOrKey: configService.get<string>("JWT_SECRET"),
    };

    super(options);
  }

  public async validate(payload: RefreshTokenPayload): Promise<TokenUser> {
    if (typeof payload.sub !== "string" || typeof payload.jti !== "string")
      throw new TokenException.InvalidRefreshTokenProvided();

    return { id: payload.sub, jti: payload.jti };
  }
}
