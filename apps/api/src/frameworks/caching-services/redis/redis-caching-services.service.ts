import { ICachingServices } from "@/core/abstracts/caching-services.abstract";
import { IGenericCachingRepository } from "@/core/abstracts/generic-caching-repository.abstract";
import { StoryContent } from "@/core/entities/story.entity";
import { Inject, Injectable } from "@nestjs/common";
import { RedisGenericRepository } from "./redis-generic-repository";

@Injectable()
export class RedisCachingServices implements ICachingServices {
	stories: IGenericCachingRepository<StoryContent>;

	constructor(
		@Inject("StoriesRedis") storiesRedis: RedisGenericRepository<StoryContent>,
	) {
		this.stories = storiesRedis;
	}
}
