import { QueueProcessingServicesModule } from "@/frameworks/processing-services/queue/queue-processing-services.module";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { StoryFeatureModule } from "../story/story-feature.module";
import { StoryContentProcessor } from "./story-content.processor";

@Module({
	imports: [
		QueueProcessingServicesModule,
		BullModule.registerQueue({ name: "StoryContent" }),
		StoryFeatureModule,
	],
	providers: [StoryContentProcessor],
	exports: [StoryContentProcessor, BullModule],
})
export class StoryProcessingFeatureModule {}
