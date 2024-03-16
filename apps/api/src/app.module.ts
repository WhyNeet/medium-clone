import { ConfigurationModule } from "@/configuration/configuration.module";
import { FeaturesModule } from "@/features/features.module";
import { AuthServicesModule } from "@/frameworks/auth-services/auth-services.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { TokenController } from "./controllers/token.controller";
import { UserController } from "./controllers/user.controller";
import { AuthFeatureModule } from "./features/auth/auth-feature.module";
import { DataServicesFeatureModule } from "./features/data-services/data-services-feature.module";
import { TokenFeatureModule } from "./features/token/token-feature.module";
import { ExceptionHandlingModule } from "./frameworks/exception-handing/exception-handling.module";

@Module({
	imports: [
		ConfigurationModule,
		DataServicesModule,
		AuthServicesModule,
		FeaturesModule,
		ExceptionHandlingModule,
		TokenFeatureModule,
		AuthFeatureModule,
		DataServicesFeatureModule,
	],
	controllers: [AuthController, UserController, TokenController],
	providers: [],
})
export class AppModule {}
