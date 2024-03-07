import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, WithSecretOrKey } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AccessTokenPayload } from "../types/token-payload.interface";
import { CookiesExtractorService } from "../extractors/cookies-extractor.service";
import { TokenType } from "../types/token-type.enum";
import { TokenUser } from "../types/token-user.interface";
import { TokenException } from "@/features/exception/exceptions/token.exception";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "access-token",
) {
  constructor(
    configService: ConfigService,
    cookiesExtractorService: CookiesExtractorService,
  ) {
    const options: WithSecretOrKey = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookiesExtractorService.tokenExtractor(TokenType.AccessToken),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      algorithms: ["HS256"],
      secretOrKey: configService.get<string>("JWT_SECRET"),
    };

    super(options);
  }

  public async validate(payload: AccessTokenPayload): Promise<TokenUser> {
    if (typeof payload.sub !== "string" || typeof payload.rti !== "string")
      throw new TokenException.InvalidAccessTokenProvided();

    return { id: payload.sub, jti: payload.rti };
  }
}
