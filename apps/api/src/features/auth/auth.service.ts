import { IAuthScopesResolverService } from "@/core/abstracts/auth-scopes-resolver.abstract";
import { TokenType } from "@/core/entities/token.entity";
import { RefreshTokenPayload } from "@/frameworks/auth-services/jwt/types/token-payload.interface";
import { CryptoService } from "@/frameworks/crypto-services/crypto.service";
import { Injectable } from "@nestjs/common";
import { CookieOptions, Response } from "express";
import { TokenException } from "../exception/exceptions/token.exception";
import { TokenEncryptionService } from "../token/token-encryption.service";
import { TokenFactoryService } from "../token/token-factory.service";
import { TokenRepositoryService } from "../token/token-repository.service";

@Injectable()
export class AuthService {
	constructor(
		private cryptoService: CryptoService,
		private tokenEncryptionService: TokenEncryptionService,
		private authScopesService: IAuthScopesResolverService,
		private tokenFactoryService: TokenFactoryService,
		private tokenRepositoryService: TokenRepositoryService,
	) {}

	/**
	 *
	 * @param {string} password The input password.
	 * @param {string} encrypted The user's hashed password from a database.
	 * @returns {Promise<boolean>} The password matches encrypted.
	 */
	public async verifyUserPassword(
		password: string,
		encrypted: string,
	): Promise<boolean> {
		return await this.cryptoService.comparePassword(password, encrypted);
	}

	/**
	 *
	 * @param id The user's id.
	 * @returns Access and refresh tokens.
	 */
	public async issueTokenPair(
		id: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const tokenEntity = this.tokenFactoryService.createNewRefreshToken();
		const { id: jti } =
			await this.tokenRepositoryService.createToken(tokenEntity);

		const refreshToken = await this.tokenEncryptionService.issueRefreshToken(
			id,
			jti,
		);
		const accessToken = await this.tokenEncryptionService.issueAccessToken(
			id,
			jti,
		);

		return { accessToken, refreshToken };
	}

	public async refreshTokenPair(
		refreshTokenPayload: RefreshTokenPayload,
	): Promise<{ accessToken: string; refreshToken: string }> {
		await this.tokenRepositoryService.deleteToken(refreshTokenPayload.jti);

		const tokenEntity = this.tokenFactoryService.createNewRefreshToken();
		const { id: jti } =
			await this.tokenRepositoryService.createToken(tokenEntity);

		const refreshToken = await this.tokenEncryptionService.issueRefreshToken(
			refreshTokenPayload.sub,
			jti,
			refreshTokenPayload.exp,
		);
		const accessToken = await this.tokenEncryptionService.issueAccessToken(
			refreshTokenPayload.sub,
			jti,
		);

		return { accessToken, refreshToken };
	}

	public setCookies(res: Response, accessToken: string, refreshToken: string) {
		const cookieOptions: CookieOptions = {
			httpOnly: true,
			sameSite: "lax",
		};

		res.cookie(TokenType.AccessToken, accessToken, cookieOptions);
		res.cookie(TokenType.RefreshToken, refreshToken, cookieOptions);
	}

	public clearCookies(res: Response) {
		res.clearCookie(TokenType.AccessToken);
		res.clearCookie(TokenType.RefreshToken);
	}

	/**
	 *
	 * @param id The user's id.
	 * @param scope Scope available via API token.
	 * @param expiresIn Expiration time for an API token.
	 * @returns An API token.
	 */
	public async issueApiToken(
		id: string,
		name: string,
		scope: string,
		expiresIn: number,
	): Promise<string> {
		const availableScopes = this.authScopesService.getAvailableScopes();
		const tokenScopes = scope.split(" ");

		for (const scope of tokenScopes) {
			if (!availableScopes.includes(scope))
				throw new TokenException.InvalidApiTokenScopeSpecified(
					`Scope "${scope}" does not exist.`,
				);
		}

		const apiTokenEntity = this.tokenFactoryService.createNewApiToken(
			name,
			expiresIn,
		);
		const { id: jti } =
			await this.tokenRepositoryService.createToken(apiTokenEntity);

		const apiToken = await this.tokenEncryptionService.issueApiToken(
			id,
			jti,
			tokenScopes,
			expiresIn,
		);

		return apiToken;
	}

	public async checkToken(jti: string, type: TokenType): Promise<boolean> {
		const token = await this.tokenRepositoryService.getTokenById(jti);
		return !!token && token.type === type;
	}
}
