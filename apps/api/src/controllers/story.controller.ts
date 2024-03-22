import { StoryDeltasDto } from "@/core/dtos/story.dto";
import { Story } from "@/core/entities/story.entity";
import { StoryException } from "@/features/exception/exceptions/story.exception";
import { StoryContentDeltas } from "@/features/story-processing/types/story-content-deltas.interface";
import { StoryRepositoryService } from "@/features/story/story-repository.service";
import { User } from "@/features/user/user.decorator";
import { AccessTokenGuard } from "@/frameworks/auth-services/jwt/guards/access-token.guard";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Queue } from "bull";

@Controller("/story")
export class StoryController {
	constructor(
		private storyRepositoryService: StoryRepositoryService,
		@InjectQueue("StoryContent") private storyContentQueue: Queue,
	) {}

	@UseGuards(AccessTokenGuard)
	@Post("")
	public async createStory(@User() user: TokenUser): Promise<Story> {
		const story = await this.storyRepositoryService.createStory(user.id);

		return story;
	}

	@UseGuards(AccessTokenGuard)
	@Post("/:id/deltas")
	public async resolveDeltas(
		@User() user: TokenUser,
		@Param("id") storyId: string,
		@Body() deltas: StoryDeltasDto,
	) {
		if ((await this.storyRepositoryService.getStoryById(storyId)) === null)
			throw new StoryException.StoryDoesNotExist();

		const deltasData: StoryContentDeltas = {
			deltas: deltas.deltas,
			storyId,
			userId: user.id,
		};

		this.storyContentQueue.add(deltasData);
	}

	@Get("/:id")
	public async getStory(@Param("id") storyId: string) {
		const story = await this.storyRepositoryService.getStoryById(storyId);

		return story;
	}
}
