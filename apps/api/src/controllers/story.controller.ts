import { Story } from "@/core/entities/story.entity";
import { StoryRepositoryService } from "@/features/story/story-repository.service";
import { User } from "@/features/user/user.decorator";
import { AccessTokenGuard } from "@/frameworks/auth-services/jwt/guards/access-token.guard";
import { TokenUser } from "@/frameworks/auth-services/jwt/types/token-user.interface";
import { Controller, Post, UseGuards } from "@nestjs/common";

@Controller("/story")
export class StoryController {
	constructor(private storyRepositoryService: StoryRepositoryService) {}

	@UseGuards(AccessTokenGuard)
	@Post("")
	public async createStory(@User() user: TokenUser): Promise<Story> {
		const story = await this.storyRepositoryService.createStory(user.id);

		return story;
	}
}
