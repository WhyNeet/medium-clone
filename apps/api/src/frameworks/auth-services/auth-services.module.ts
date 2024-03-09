import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthServicesModule } from "./jwt/jwt-auth-services.module";
import { CryptoModule } from "./crypto/crypto.module";
import { AuthScopesModule } from "./scopes/auth-scopes.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtAuthServicesModule,
    CryptoModule,
    AuthScopesModule,
  ],
  exports: [JwtAuthServicesModule, CryptoModule, AuthScopesModule],
})
export class AuthServicesModule {}
