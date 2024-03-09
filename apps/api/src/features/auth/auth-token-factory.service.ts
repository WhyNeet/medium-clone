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
  private accessTokenExpiresIn: string;
  private refreshTokenExpiresIn: string;
  private apiTokenSecret: string;

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.accessTokenExpiresIn = configService.get<string>(
      "JWT_ACCESS_TOKEN_EXPIRES_IN",
    );
    this.refreshTokenExpiresIn = configService.get<string>(
      "JWT_REFRESH_TOKEN_EXPIRES_IN",
    );
    this.apiTokenSecret = configService.get<string>("API_TOKEN_JWT_SECRET");
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
  ): Promise<{ token: string; jti: string }> {
    const payload: RefreshTokenPayload = {
      sub: id,
      jti: crypto.randomUUID(),
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshTokenExpiresIn,
    });

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
}
