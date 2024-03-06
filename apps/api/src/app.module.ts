import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@/configuration/configuration.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { AuthServicesModule } from "@/frameworks/auth-services/auth-services.module";
import { FeaturesModule } from "@/features/features.module";
import { AuthController } from "./controllers/auth.controller";
import { ExceptionHandlingModule } from "./frameworks/exception-handing/exception-handling.module";
import { UserController } from "./controllers/user.controller";

@Module({
  imports: [
    ConfigurationModule,
    DataServicesModule,
    AuthServicesModule,
    FeaturesModule,
    ExceptionHandlingModule,
  ],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {}
