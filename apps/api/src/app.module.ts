import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@/configuration/configuration.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { UserFeatureModule } from "./features/user/user-feature.module";
import { AuthServicesModule } from "./frameworks/auth-services/auth-services.module";

@Module({
  imports: [
    ConfigurationModule,
    DataServicesModule,
    AuthServicesModule,
    UserFeatureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
