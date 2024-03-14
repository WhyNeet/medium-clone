import { TokenType } from "@/core/entities/token.entity";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthTokenFactoryService } from "./auth-token-factory.service";
import { AuthService } from "./auth.service";
import { RefreshTokenPayload } from "@/frameworks/auth-services/jwt/types/token-payload.interface";

@Injectable()
export class TokenRefreshMiddleware implements NestMiddleware {
  constructor(
    private authTokenFactoryService: AuthTokenFactoryService,
    private authService: AuthService,
  ) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies[TokenType.RefreshToken];
    if (!refreshToken) return next();

    const refreshTokenPayload =
      await this.authTokenFactoryService.decodeRefreshToken(
        refreshToken,
        false,
      );

    if (!refreshTokenPayload) return next();

    const accessToken = req.cookies[TokenType.AccessToken];
    if (!accessToken) {
      await this.refreshAccessToken(req, res, refreshTokenPayload);
      return next();
    }

    const accessTokenPayload =
      await this.authTokenFactoryService.decodeAccessToken(accessToken);
    if (!accessTokenPayload)
      await this.refreshAccessToken(req, res, refreshTokenPayload);

    next();
  }

  private async refreshAccessToken(
    req: Request,
    res: Response,
    refreshTokenPayload: RefreshTokenPayload,
  ) {
    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      refreshTokenPayload.sub,
      refreshTokenPayload.exp,
    );

    req.cookies[TokenType.AccessToken] = accessToken;
    req.cookies[TokenType.RefreshToken] = refreshToken;

    this.authService.setCookies(res, accessToken, refreshToken);
  }
}
