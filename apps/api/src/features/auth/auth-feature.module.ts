import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CryptoModule } from "@/frameworks/auth-services/crypto/crypto.module";
import { UserFeatureModule } from "../user/user-feature.module";
import { AuthTokenFactoryService } from "./auth-token-factory.service";
import { JwtAuthServicesModule } from "@/frameworks/auth-services/jwt/jwt-auth-services.module";
import { AuthScopesModule } from "@/frameworks/auth-services/scopes/auth-scopes.module";
import { TokenRefreshMiddleware } from "./token-refresh.middleware";

@Module({
  imports: [
    CryptoModule,
    UserFeatureModule,
    JwtAuthServicesModule,
    AuthScopesModule,
  ],
  providers: [AuthService, AuthTokenFactoryService],
  exports: [AuthService, AuthTokenFactoryService],
})
export class AuthFeatureModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenRefreshMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
