import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class TokenGuard extends AuthGuard(["api-token", "access-token"]) {}
