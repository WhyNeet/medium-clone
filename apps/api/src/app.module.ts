import { ConfigurationModule } from "@/configuration/configuration.module";
import { FeaturesModule } from "@/features/features.module";
import { AuthServicesModule } from "@/frameworks/auth-services/auth-services.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { TokenController } from "./controllers/token.controller";
import { UserController } from "./controllers/user.controller";
import { CryptoServicesModule } from "./frameworks/crypto-services/crypto-services.module";
import { ExceptionHandlingModule } from "./frameworks/exception-handing/exception-handling.module";

@Module({
	imports: [
		ConfigurationModule,
		DataServicesModule,
		AuthServicesModule,
		CryptoServicesModule,
		FeaturesModule,
		ExceptionHandlingModule,
	],
	controllers: [AuthController, UserController, TokenController],
	providers: [],
})
export class AppModule {}
