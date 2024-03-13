import { CreateUserDto, UserCredentialsDto } from "@/core/dtos/user.dto";
import { AuthService } from "@/features/auth/auth.service";
import { AuthException } from "@/features/exception/exceptions/auth.exception";
import { UserFactoryService } from "@/features/user/user-factory.service";
import { UserRepositoryService } from "@/features/user/user-repository.service";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";

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
    @Res({ passthrough: true }) res: Response,
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

    this.authService.setCookies(res, accessToken, refreshToken);

    return {
      user: this.userFactoryService.createDto(user),
    };
  }

  @Post("/register")
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userRepositoryService.createUser(createUserDto);

    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      user.id,
    );

    this.authService.setCookies(res, accessToken, refreshToken);

    return {
      user: this.userFactoryService.createDto(user),
    };
  }
}
