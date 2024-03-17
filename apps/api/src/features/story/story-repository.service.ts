import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Story } from "@/core/entities/story.entity";
import { Injectable } from "@nestjs/common";
import { StoryFactoryService } from "./story-factory.service";

@Injectable()
export class StoryRepositoryService {
	constructor(
		private dataServices: IDataServices,
		private storyFactoryService: StoryFactoryService,
	) {}

	public async createStory(authorId: string): Promise<Story> {
		const story = this.storyFactoryService.createNewStory(authorId);

		return await this.dataServices.stories.create(story);
	}

	public async getStoryById(id: string): Promise<Story | null> {
		return await this.dataServices.stories.getById(id);
	}

	public async updateStory(id: string, story: Story): Promise<Story | null> {
		return await this.dataServices.stories.update(id, story);
	}
}
