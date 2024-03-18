import { ConfigurationModule } from "@/configuration/configuration.module";
import { FeaturesModule } from "@/features/features.module";
import { AuthServicesModule } from "@/frameworks/auth-services/auth-services.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { StoryController } from "./controllers/story.controller";
import { TokenController } from "./controllers/token.controller";
import { UserController } from "./controllers/user.controller";
import { CachingServicesModule } from "./frameworks/caching-services/caching-services.module";
import { CryptoServicesModule } from "./frameworks/crypto-services/crypto-services.module";
import { ExceptionHandlingModule } from "./frameworks/exception-handing/exception-handling.module";
import { GatewayModule } from "./gateways/gateway.module";

@Module({
	imports: [
		ConfigurationModule,
		DataServicesModule,
		CachingServicesModule,
		AuthServicesModule,
		CryptoServicesModule,
		FeaturesModule,
		ExceptionHandlingModule,
		GatewayModule,
	],
	controllers: [
		AuthController,
		UserController,
		TokenController,
		StoryController,
	],
	providers: [],
})
export class AppModule {}
