import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CryptoModule } from "@/frameworks/auth-services/crypto/crypto.module";
import { UserFeatureModule } from "../user/user-feature.module";
import { AuthTokenFactoryService } from "./auth-token-factory.service";
import { JwtAuthServicesModule } from "@/frameworks/auth-services/jwt/jwt-auth-services.module";
import { AuthScopesModule } from "@/frameworks/auth-services/scopes/auth-scopes.module";

@Module({
  imports: [
    CryptoModule,
    UserFeatureModule,
    JwtAuthServicesModule,
    AuthScopesModule,
  ],
  providers: [AuthService, AuthTokenFactoryService],
  exports: [AuthService],
})
export class AuthFeatureModule {}
