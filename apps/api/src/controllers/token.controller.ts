import { CreateApiTokenDto } from "@/core/dtos/api-token.dto";
import { AuthTokenInterceptor } from "@/features/auth/auth-token.interceptor";
import { AuthService } from "@/features/auth/auth.service";
import { User } from "@/features/user/user.decorator";
import { AccessTokenGuard } from "@/frameworks/auth-services/jwt/guards/access-token.guard";
import { RefreshTokenGuard } from "@/frameworks/auth-services/jwt/guards/refresh-token.guard";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

@Controller("/token")
export class TokenController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(AuthTokenInterceptor)
  @UseGuards(RefreshTokenGuard)
  @Post("/refresh")
  public async refreshToken(@User() user: TokenUser) {
    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      user.id,
    );

    // TODO: token rotation

    return { accessToken, refreshToken };
  }

  @UseGuards(AccessTokenGuard)
  @Post("/api-token")
  public async createApiToken(
    @User() user: TokenUser,
    @Body() createApiTokenDto: CreateApiTokenDto,
  ) {
    const { token, jti } = await this.authService.issueApiToken(
      user.id,
      createApiTokenDto.scope,
      createApiTokenDto.expiresIn,
    );

    // TODO: store token in a database

    return { id: jti, token };
  }
}
