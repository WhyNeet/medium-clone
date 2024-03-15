import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@/configuration/configuration.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { AuthServicesModule } from "@/frameworks/auth-services/auth-services.module";
import { FeaturesModule } from "@/features/features.module";
import { AuthController } from "./controllers/auth.controller";
import { ExceptionHandlingModule } from "./frameworks/exception-handing/exception-handling.module";
import { TokenController } from "./controllers/token.controller";
import { TokenFeatureModule } from "./features/token/token-feature.module";
import { AuthFeatureModule } from "./features/auth/auth-feature.module";
import { DataServicesFeatureModule } from "./features/data-services/data-services-feature.module";

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
  controllers: [AuthController, TokenController],
  providers: [],
})
export class AppModule {}
