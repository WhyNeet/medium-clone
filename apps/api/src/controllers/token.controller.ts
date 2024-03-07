import { AuthService } from "@/features/auth/auth.service";
import { User } from "@/features/user/user.decorator";
import { RefreshTokenGuard } from "@/frameworks/auth-services/jwt/guards/refresh-token.guard";
import { TokenType } from "@/frameworks/auth-services/jwt/types/token-type.enum";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";

@Controller("/token")
export class TokenController {
  constructor(private authService: AuthService) {}

  @UseGuards(RefreshTokenGuard)
  @Post("/refresh")
  public async refreshToken(
    @User() user: TokenUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      user.id,
    );

    // TODO: token rotation

    response.cookie(TokenType.AccessToken, accessToken);
    response.cookie(TokenType.RefreshToken, refreshToken);

    return { accessToken, refreshToken };
  }
}
