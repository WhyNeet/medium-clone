import { TokenType } from "@/core/entities/token.entity";
import { TokenException } from "@/features/exception/exceptions/token.exception";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class TokenGuard extends AuthGuard(["api-token", "access-token"]) {
	public handleRequest<TUser = unknown>(
		err: unknown,
		user: unknown,
		info: unknown[],
		context: ExecutionContext,
		status?: unknown,
	): TUser {
		// No errors occured
		if (user) return super.handleRequest(err, user, info, context, status);
		if (err) throw err;

		const ctx = context.switchToHttp();
		const request = ctx.getRequest<Request>();

		// Did client provide the API token?
		const isApiTokenAuth = !!request.header("Authorization");

		// If the token was provided
		// The exception is related to API token since it is checked before access token
		if (isApiTokenAuth) throw new TokenException.InvalidApiTokenProvided();
		// Otherwise, if access token was not provided, throw the corresponding error
		else if (!request.cookies[TokenType.AccessToken])
			throw new TokenException.AccessTokenNotProvided();
		// If it is provided and API token is not provided, the access token is invalid
		else throw new TokenException.InvalidAccessTokenProvided();
	}
}
