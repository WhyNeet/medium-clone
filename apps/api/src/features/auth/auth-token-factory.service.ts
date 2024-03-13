import type {
  AccessTokenPayload,
  ApiTokenPayload,
  RefreshTokenPayload,
} from "@/frameworks/auth-services/jwt/types/token-payload.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import crypto from "node:crypto";

@Injectable()
export class AuthTokenFactoryService {
  private accessTokenExpiresIn: number;
  private refreshTokenExpiresIn: number;
  private apiTokenSecret: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.accessTokenExpiresIn = Number(
      this.configService.get<string>("JWT_ACCESS_TOKEN_EXPIRES_IN"),
    );
    this.refreshTokenExpiresIn = Number(
      this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRES_IN"),
    );
    this.apiTokenSecret = this.configService.get<string>(
      "API_TOKEN_JWT_SECRET",
    );
  }

  /**
   *
   * @param id The user's id.
   * @param jti Refresh token id.
   * @returns An access token.
   */
  public async issueAccessToken(id: string, jti: string): Promise<string> {
    const payload: AccessTokenPayload = {
      sub: id,
      rti: jti,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.accessTokenExpiresIn,
    });
  }

  /**
   *
   * @param {string} id The user's id.
   * @returns A refresh token and its id.
   */
  public async issueRefreshToken(
    id: string,
    customExpClaim?: number,
  ): Promise<{ token: string; jti: string }> {
    const payload: RefreshTokenPayload = {
      sub: id,
      jti: crypto.randomUUID(),
      exp: Number(
        customExpClaim ??
          (new Date().getTime() / 1000 + this.refreshTokenExpiresIn).toFixed(0),
      ),
    };

    const token = await this.jwtService.signAsync(payload);

    return { token, jti: payload.jti };
  }

  /**
   *
   * @param id The user's id.
   * @param scope Scopes available via this token.
   * @param expiresIn Token expiration time.
   * @returns
   */
  public async issueApiToken(
    id: string,
    scope: string[],
    expiresIn: string,
  ): Promise<{ token: string; jti: string }> {
    const payload: ApiTokenPayload = {
      sub: id,
      scope: scope.join(" "),
      jti: crypto.randomUUID(),
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.apiTokenSecret,
    });

    return { token, jti: payload.jti };
  }

  /**
   *
   * @param token JWT token.
   * @param requiredClaims Claims that must be present in the payload.
   * @param ignoreExpiration Ignore token expiration timestamp during verification.
   * @returns Decoded token payload if all required claims are present.
   */
  private async decodeToken<T>(
    token: string,
    requiredClaims: string[],
    ignoreExpiration: boolean,
  ): Promise<T | null> {
    const payload = await this.jwtService.verifyAsync(token, {
      ignoreExpiration,
    });

    if (requiredClaims.some((claim) => !payload[claim])) return null;

    return payload;
  }

  public async decodeAccessToken(
    token: string,
    ignoreExpiration?: boolean,
  ): Promise<(AccessTokenPayload & { exp: string }) | null> {
    try {
      const payload = await this.decodeToken<
        AccessTokenPayload & { exp: string }
      >(token, ["sub", "rti"], ignoreExpiration ?? false);
      return payload;
    } catch (_) {
      return null;
    }
  }

  public async decodeRefreshToken(
    token: string,
    ignoreExpiration?: boolean,
  ): Promise<RefreshTokenPayload | null> {
    try {
      const payload = await this.decodeToken<RefreshTokenPayload>(
        token,
        ["sub", "jti"],
        ignoreExpiration ?? false,
      );
      return payload;
    } catch (_) {
      return null;
    }
  }
}
