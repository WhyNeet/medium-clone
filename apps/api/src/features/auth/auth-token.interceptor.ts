import { TokenType } from "@/frameworks/auth-services/jwt/types/token-type.enum";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { CookieOptions, Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  private cookieOptions: CookieOptions = {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  };

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap((data) => {
        if (
          typeof data["accessToken"] === "string" &&
          typeof data["refreshToken"] === "string"
        ) {
          response.cookie(
            TokenType.AccessToken,
            data["accessToken"],
            this.cookieOptions,
          );
          response.cookie(
            TokenType.RefreshToken,
            data["refreshToken"],
            this.cookieOptions,
          );
        }
      }),
    );
  }
}
