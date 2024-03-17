import { DataServicesModule } from "@/frameworks/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { StoryFactoryService } from "./story-factory.service";
import { StoryRepositoryService } from "./story-repository.service";

@Module({
	imports: [DataServicesModule],
	providers: [StoryRepositoryService, StoryFactoryService],
	exports: [StoryRepositoryService, StoryFactoryService],
})
export class StoryFeatureModule {}
