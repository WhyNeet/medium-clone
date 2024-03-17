import type {
	AccessTokenPayload,
	ApiTokenPayload,
	RefreshTokenPayload,
} from "@/frameworks/auth-services/jwt/types/token-payload.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenEncryptionService {
	private accessTokenExpiresIn: number;
	private refreshTokenExpiresIn: number;
	private apiTokenDefaultExpiresIn: number;

	private accessTokenSecret: string;
	private refreshTokenSecret: string;
	private apiTokenSecret: string;

	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {
		this.accessTokenExpiresIn = this.configService.get<number>(
			"tokens.accessToken.expiration",
		);
		this.refreshTokenExpiresIn = this.configService.get<number>(
			"tokens.refreshToken.expiration",
		);
		this.apiTokenDefaultExpiresIn = this.configService.get<number>(
			"tokens.apiToken.expiration",
		);

		this.accessTokenSecret = this.configService.get<string>(
			"tokens.accessToken.secret",
		);
		this.refreshTokenSecret = this.configService.get<string>(
			"tokens.refreshToken.secret",
		);
		this.apiTokenSecret = this.configService.get<string>(
			"tokens.apiToken.secret",
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
			secret: this.accessTokenSecret,
		});
	}

	/**
	 *
	 * @param {string} id The user's id.
	 * @returns A refresh token.
	 */
	public async issueRefreshToken(
		id: string,
		jti: string,
		customExpClaim?: number,
	): Promise<string> {
		const payload: RefreshTokenPayload = {
			sub: id,
			jti,
			exp: Number(
				customExpClaim ??
					(new Date().getTime() / 1000 + this.refreshTokenExpiresIn).toFixed(0),
			),
		};

		const token = await this.jwtService.signAsync(payload, {
			secret: this.refreshTokenSecret,
		});

		return token;
	}

	/**
	 *
	 * @param id The user's id.
	 * @param scopes Scopes available via this token.
	 * @param expiresIn Token expiration time.
	 * @returns An API token.
	 */
	public async issueApiToken(
		id: string,
		jti: string,
		scopes: string[],
		expiresIn?: number,
	): Promise<string> {
		const payload: ApiTokenPayload = {
			sub: id,
			scope: scopes.join(" "),
			jti,
		};

		const token = await this.jwtService.signAsync(payload, {
			expiresIn: expiresIn ?? this.apiTokenDefaultExpiresIn,
			secret: this.apiTokenSecret,
		});

		return token;
	}

	/**
	 *
	 * @param token JWT token.
	 * @param requiredClaims Claims that must be present in the payload.
	 * @param ignoreExpiration Ignore token expiration timestamp during verification.
	 * @returns Decoded token payload if all required claims are present.
	 */
	private async decodeToken<T>(
		token: string,
		requiredClaims: string[],
		ignoreExpiration: boolean,
	): Promise<T | null> {
		const payload = await this.jwtService.verifyAsync(token, {
			ignoreExpiration,
		});

		if (requiredClaims.some((claim) => !payload[claim])) return null;

		return payload;
	}

	public async decodeAccessToken(
		token: string,
		ignoreExpiration?: boolean,
	): Promise<(AccessTokenPayload & { exp: string }) | null> {
		try {
			const payload = await this.decodeToken<
				AccessTokenPayload & { exp: string }
			>(token, ["sub", "rti"], ignoreExpiration ?? false);
			return payload;
		} catch (_) {
			return null;
		}
	}

	public async decodeRefreshToken(
		token: string,
		ignoreExpiration?: boolean,
	): Promise<RefreshTokenPayload | null> {
		try {
			const payload = await this.decodeToken<RefreshTokenPayload>(
				token,
				["sub", "jti"],
				ignoreExpiration ?? false,
			);
			return payload;
		} catch (_) {
			return null;
		}
	}
}
