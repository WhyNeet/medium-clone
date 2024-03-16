import { TokenType } from "@/core/entities/token.entity";
import { TokenException } from "@/features/exception/exceptions/token.exception";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { TokenService } from "../services/token.service";
import type { ApiTokenPayload } from "../types/token-payload.interface";
import type { TokenUser } from "../types/token-user.interface";

@Injectable()
export class ApiTokenStrategy extends PassportStrategy(Strategy, "api-token") {
	constructor(
		configService: ConfigService,
		private tokenService: TokenService,
	) {
		const options: StrategyOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			algorithms: ["HS256"],
			secretOrKey: configService.get<string>("tokens.apiToken.secret"),
			passReqToCallback: true,
		};

		super(options);
	}

	public async validate(
		request: Request,
		payload: ApiTokenPayload,
	): Promise<TokenUser> {
		if (
			typeof payload.sub !== "string" ||
			typeof payload.jti !== "string" ||
			typeof payload.scope !== "string"
		)
			throw new TokenException.InvalidApiTokenProvided();

		const path = request.path.slice(5);
		const requestScope = path.slice(0, path.indexOf("/"));

		const allowedScopes = payload.scope.split(" ");

		if (!allowedScopes.includes(requestScope))
			throw new TokenException.InvalidApiTokenScope(
				`The token provided cannot be used on "${requestScope}" scope.`,
			);

		const isValidToken = await this.tokenService.checkToken(
			payload.jti,
			TokenType.ApiToken,
		);
		if (!isValidToken) throw new TokenException.RevokedApiTokenProvided();

		return { id: payload.sub, jti: payload.jti };
	}
}
