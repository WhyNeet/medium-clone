import { Module } from "@nestjs/common";
import { AuthFeatureModule } from "./auth/auth-feature.module";
import { StoryFeatureModule } from "./story/story-feature.module";
import { TokenFeatureModule } from "./token/token-feature.module";
import { UserFeatureModule } from "./user/user-feature.module";

@Module({
	imports: [
		UserFeatureModule,
		AuthFeatureModule,
		TokenFeatureModule,
		StoryFeatureModule,
	],
	exports: [
		UserFeatureModule,
		AuthFeatureModule,
		TokenFeatureModule,
		StoryFeatureModule,
	],
})
export class FeaturesModule {}
