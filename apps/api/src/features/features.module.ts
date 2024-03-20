import { Module } from "@nestjs/common";
import { AuthFeatureModule } from "./auth/auth-feature.module";
import { StoryProcessingFeatureModule } from "./story-processing/story-processing-feature.module";
import { StoryFeatureModule } from "./story/story-feature.module";
import { TokenFeatureModule } from "./token/token-feature.module";
import { UserFeatureModule } from "./user/user-feature.module";

@Module({
	imports: [
		UserFeatureModule,
		AuthFeatureModule,
		TokenFeatureModule,
		StoryFeatureModule,
		StoryProcessingFeatureModule,
	],
	exports: [
		UserFeatureModule,
		AuthFeatureModule,
		TokenFeatureModule,
		StoryFeatureModule,
		StoryProcessingFeatureModule,
	],
})
export class FeaturesModule {}
