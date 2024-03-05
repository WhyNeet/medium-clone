import { Module } from "@nestjs/common";
import { UserFeatureModule } from "./user/user-feature.module";
import { AuthFeatureModule } from "./auth/auth-feature.module";

@Module({
  imports: [UserFeatureModule, AuthFeatureModule],
  exports: [UserFeatureModule, AuthFeatureModule],
})
export class FeaturesModule {}
