import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@/configuration/configuration.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { AuthServicesModule } from "./frameworks/auth-services/auth-services.module";
import { FeaturesModule } from "./features/features.module";

@Module({
  imports: [
    ConfigurationModule,
    DataServicesModule,
    AuthServicesModule,
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
