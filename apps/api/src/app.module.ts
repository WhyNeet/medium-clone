import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@/configuration/configuration.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { AuthServicesModule } from "@/frameworks/auth-services/auth-services.module";
import { FeaturesModule } from "@/features/features.module";
import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [
    ConfigurationModule,
    DataServicesModule,
    AuthServicesModule,
    FeaturesModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
