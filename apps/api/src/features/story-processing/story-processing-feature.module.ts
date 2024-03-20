import { CachingServicesModule } from "@/frameworks/caching-services/caching-services.module";
import { QueueProcessingServicesModule } from "@/frameworks/processing-services/queue/queue-processing-services.module";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { StoryContentProcessor } from "./story-content.processor";

@Module({
	imports: [
		QueueProcessingServicesModule,
		BullModule.registerQueue({ name: "StoryContent" }),
		CachingServicesModule,
	],
	providers: [StoryContentProcessor],
})
export class StoryProcessingFeatureModule {}
