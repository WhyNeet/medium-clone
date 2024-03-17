import { CreateUserDto, UserCredentialsDto } from "@/core/dtos/user.dto";
import { AuthService } from "@/features/auth/auth.service";
import { AuthException } from "@/features/exception/exceptions/auth.exception";
import { TokenRepositoryService } from "@/features/token/token-repository.service";
import { UserFactoryService } from "@/features/user/user-factory.service";
import { UserRepositoryService } from "@/features/user/user-repository.service";
import { User } from "@/features/user/user.decorator";
import { AccessTokenGuard } from "@/frameworks/auth-services/jwt/guards/access-token.guard";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";

@Controller("/auth")
export class AuthController {
	constructor(
		private authService: AuthService,
		private userRepositoryService: UserRepositoryService,
		private userFactoryService: UserFactoryService,
		private tokenRepositoryService: TokenRepositoryService,
	) {}

	@HttpCode(HttpStatus.OK)
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

	@HttpCode(HttpStatus.OK)
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

	@HttpCode(HttpStatus.OK)
	@UseGuards(AccessTokenGuard)
	@Post("/logout")
	public async logout(
		@User() user: TokenUser,
		@Res({ passthrough: true }) res: Response,
	) {
		await this.tokenRepositoryService.deleteToken(user.jti);

		this.authService.clearCookies(res);
	}
}
