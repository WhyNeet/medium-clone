import { CreateUserDto, UserCredentialsDto } from "@/core/dtos/user.dto";
import { AuthService } from "@/features/auth/auth.service";
import { AuthException } from "@/features/exception/exceptions/auth.exception";
import { UserFactoryService } from "@/features/user/user-factory.service";
import { UserRepositoryService } from "@/features/user/user-repository.service";
import { TokenType } from "@/frameworks/auth-services/jwt/types/token-type.enum";
import { Body, Controller, Post, Res } from "@nestjs/common";
import type { Response } from "express";

@Controller("/auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userRepositoryService: UserRepositoryService,
    private userFactoryService: UserFactoryService,
  ) {}

  @Post("/login")
  public async login(
    @Body() userCredentialsDto: UserCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userRepositoryService.getUserByEmail(
      userCredentialsDto.email,
    );

    if (!user) throw new AuthException.UserDoesNotExist();

    const isPasswordValid = await this.authService.verifyUserPassword(
      userCredentialsDto.password,
      user.password,
    );

    if (!isPasswordValid) throw new AuthException.WrongPassword();

    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      user.id,
    );

    response.cookie(TokenType.AccessToken, accessToken);
    response.cookie(TokenType.RefreshToken, refreshToken);

    return {
      user: this.userFactoryService.createDto(user),
      accessToken,
      refreshToken,
    };
  }

  @Post("/register")
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userRepositoryService.createUser(createUserDto);

    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      user.id,
    );

    response.cookie(TokenType.AccessToken, accessToken);
    response.cookie(TokenType.RefreshToken, refreshToken);

    return {
      user: this.userFactoryService.createDto(user),
      accessToken,
      refreshToken,
    };
  }
}
