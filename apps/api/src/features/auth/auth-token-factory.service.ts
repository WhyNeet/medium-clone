import type {
  AccessTokenPayload,
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
}
