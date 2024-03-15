import { CreateApiTokenDto } from "@/core/dtos/token.dto";
import { AuthService } from "@/features/auth/auth.service";
import { User } from "@/features/user/user.decorator";
import { TokenGuard } from "@/frameworks/auth-services/jwt/guards/token.guard";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";

@Controller("/token")
export class TokenController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(TokenGuard)
  @Post("/api-token")
  public async createApiToken(
    @User() user: TokenUser,
    @Body() createApiTokenDto: CreateApiTokenDto,
  ) {
    const apiToken = await this.authService.issueApiToken(
      user.id,
      createApiTokenDto.name,
      createApiTokenDto.scope,
      createApiTokenDto.expiresIn,
    );

    return { token: apiToken };
  }
}
