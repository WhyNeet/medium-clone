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
    if (!info?.length)
      return super.handleRequest(err, user, info, context, status);

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const isApiTokenAuth = !!request.header("Authorization");

    if (isApiTokenAuth) throw new TokenException.InvalidApiTokenProvided();
    else throw new TokenException.InvalidAccessTokenProvided();
  }
}
