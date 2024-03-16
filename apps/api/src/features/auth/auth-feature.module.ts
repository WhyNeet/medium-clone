import { CryptoModule } from "@/frameworks/auth-services/crypto/crypto.module";
import { JwtAuthServicesModule } from "@/frameworks/auth-services/jwt/jwt-auth-services.module";
import { AuthScopesModule } from "@/frameworks/auth-services/scopes/auth-scopes.module";
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { DataServicesFeatureModule } from "../data-services/data-services-feature.module";
import { TokenFeatureModule } from "../token/token-feature.module";
import { UserFeatureModule } from "../user/user-feature.module";
import { AuthService } from "./auth.service";
import { TokenRefreshMiddleware } from "./token-refresh.middleware";

@Module({
	imports: [
		CryptoModule,
		UserFeatureModule,
		TokenFeatureModule,
		AuthScopesModule,
		JwtAuthServicesModule,
		DataServicesFeatureModule,
	],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthFeatureModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenRefreshMiddleware)
			.forRoutes({ path: "*", method: RequestMethod.ALL });
	}
}
