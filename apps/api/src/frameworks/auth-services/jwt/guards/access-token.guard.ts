import { TokenType } from "@/core/entities/token.entity";
import { TokenException } from "@/features/exception/exceptions/token.exception";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class AccessTokenGuard extends AuthGuard("access-token") {
  public handleRequest<TUser = unknown>(
    err: unknown,
    user: unknown,
    info: unknown,
    context: ExecutionContext,
    status?: unknown,
  ): TUser {
    // No errors occured
    if (user) return super.handleRequest(err, user, info, context, status);

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const isTokenProvided = !!request.cookies[TokenType.AccessToken];

    if (!isTokenProvided) throw new TokenException.AccessTokenNotProvided();
    else throw new TokenException.InvalidAccessTokenProvided();
  }
}
