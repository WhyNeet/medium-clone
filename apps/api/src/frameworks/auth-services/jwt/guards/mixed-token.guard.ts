import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class MixedTokenGuard extends AuthGuard(["api-token", "access-token"]) {}
