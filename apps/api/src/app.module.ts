import { Module } from "@nestjs/common";
import { ConfigurationModule } from "@/configuration/configuration.module";
import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { UserFeatureModule } from "./features/user/user-feature.module";

@Module({
  imports: [ConfigurationModule, DataServicesModule, UserFeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
