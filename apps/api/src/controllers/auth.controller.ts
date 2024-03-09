import { CreateUserDto, UserCredentialsDto } from "@/core/dtos/user.dto";
import { AuthTokenInterceptor } from "@/features/auth/auth-token.interceptor";
import { AuthService } from "@/features/auth/auth.service";
import { AuthException } from "@/features/exception/exceptions/auth.exception";
import { UserFactoryService } from "@/features/user/user-factory.service";
import { UserRepositoryService } from "@/features/user/user-repository.service";
import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";

@Controller("/auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userRepositoryService: UserRepositoryService,
    private userFactoryService: UserFactoryService,
  ) {}

  @UseInterceptors(AuthTokenInterceptor)
  @Post("/login")
  public async login(@Body() userCredentialsDto: UserCredentialsDto) {
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

    return {
      user: this.userFactoryService.createDto(user),
      accessToken,
      refreshToken,
    };
  }

  @UseInterceptors(AuthTokenInterceptor)
  @Post("/register")
  public async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userRepositoryService.createUser(createUserDto);

    const { accessToken, refreshToken } = await this.authService.issueTokenPair(
      user.id,
    );

    return {
      user: this.userFactoryService.createDto(user),
      accessToken,
      refreshToken,
    };
  }
}
