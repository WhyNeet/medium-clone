import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthServicesModule } from "./jwt/jwt-auth-services.module";
import { AuthScopesModule } from "./scopes/auth-scopes.module";

@Module({
	imports: [PassportModule, JwtAuthServicesModule, AuthScopesModule],
	exports: [JwtAuthServicesModule, AuthScopesModule],
})
export class AuthServicesModule {}
