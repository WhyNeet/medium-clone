import { Module } from "@nestjs/common";
import { AuthFeatureModule } from "./auth/auth-feature.module";
import { TokenFeatureModule } from "./token/token-feature.module";
import { UserFeatureModule } from "./user/user-feature.module";

@Module({
	imports: [UserFeatureModule, AuthFeatureModule, TokenFeatureModule],
	exports: [UserFeatureModule, AuthFeatureModule, TokenFeatureModule],
})
export class FeaturesModule {}
