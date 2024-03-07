import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import type { ApiTokenPayload } from "../types/token-payload.interface";
import type { TokenUser } from "../types/token-user.interface";
import { TokenException } from "@/features/exception/exceptions/token.exception";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApiTokenStrategy extends PassportStrategy(Strategy, "api-token") {
  constructor(configService: ConfigService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ["HS256"],
      secretOrKey: configService.get<string>("API_TOKEN_JWT_SECRET"),
      passReqToCallback: true,
    };

    super(options);
  }

  public async validate(
    request: Request,
    payload: ApiTokenPayload,
  ): Promise<TokenUser> {
    if (
      typeof payload.sub !== "string" ||
      typeof payload.jti !== "string" ||
      typeof payload.scope !== "string"
    )
      throw new TokenException.InvalidApiTokenProvided();

    const url = new URL(request.url);
    const requestScope = url.pathname.slice(0, url.pathname.indexOf("/"));

    const allowedScopes = payload.scope.split(" ");

    if (!allowedScopes.includes(requestScope))
      throw new TokenException.InvalidApiTokenScope(
        `The token provided cannot be used on "${requestScope}" scope.`,
      );

    return { id: payload.sub, jti: payload.jti };
  }
}
