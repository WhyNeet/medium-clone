import { AuthScopesModule } from "@/frameworks/auth-services/scopes/auth-scopes.module";
import { CryptoServicesModule } from "@/frameworks/crypto-services/crypto-services.module";
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { TokenFeatureModule } from "../token/token-feature.module";
import { UserFeatureModule } from "../user/user-feature.module";
import { AuthService } from "./auth.service";
import { TokenRefreshMiddleware } from "./token-refresh.middleware";

@Module({
	imports: [
		CryptoServicesModule,
		UserFeatureModule,
		TokenFeatureModule,
		AuthScopesModule,
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
