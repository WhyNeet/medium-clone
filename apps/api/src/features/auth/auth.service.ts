import { Injectable } from "@nestjs/common";
import { CryptoService } from "@/frameworks/auth-services/crypto/crypto.service";
import { AuthTokenFactoryService } from "./auth-token-factory.service";
import { IAuthScopesResolverService } from "@/core/abstracts/auth-scopes-resolver.abstract";
import { TokenException } from "../exception/exceptions/token.exception";
import { CookieOptions, Response } from "express";
import { TokenType } from "@/core/entities/token.entity";

@Injectable()
export class AuthService {
  constructor(
    private cryptoService: CryptoService,
    private authTokenFactoryService: AuthTokenFactoryService,
    private authScopesService: IAuthScopesResolverService,
  ) {}

  /**
   *
   * @param {string} password The input password.
   * @param {string} encrypted The user's hashed password from a database.
   * @returns {Promise<boolean>} The password matches encrypted.
   */
  public async verifyUserPassword(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return await this.cryptoService.comparePassword(password, encrypted);
  }

  /**
   *
   * @param id The user's id.
   * @returns Access and refresh tokens.
   */
  public async issueTokenPair(
    id: string,
    customExpClaim?: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { token: refreshToken, jti } =
      await this.authTokenFactoryService.issueRefreshToken(id, customExpClaim);
    const accessToken = await this.authTokenFactoryService.issueAccessToken(
      id,
      jti,
    );

    return { accessToken, refreshToken };
  }

  public setCookies(res: Response, accessToken: string, refreshToken: string) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: "lax",
    };

    res.cookie(TokenType.AccessToken, accessToken, cookieOptions);
    res.cookie(TokenType.RefreshToken, refreshToken, cookieOptions);
  }

  /**
   *
   * @param id The user's id.
   * @param scope Scope available via API token.
   * @param expiresIn Expiration time for an API token.
   * @returns An API token.
   */
  public async issueApiToken(
    id: string,
    scope: string,
    expiresIn: string,
  ): Promise<{ token: string; jti: string }> {
    const availableScopes = this.authScopesService.getAvailableScopes();
    const tokenScopes = scope.split(" ");

    tokenScopes.forEach((scope) => {
      if (!availableScopes.includes(scope))
        throw new TokenException.InvalidApiTokenScopeSpecified(
          `Scope "${scope}" does not exist.`,
        );
    });

    const apiToken = await this.authTokenFactoryService.issueApiToken(
      id,
      tokenScopes,
      expiresIn,
    );

    return apiToken;
  }
}
