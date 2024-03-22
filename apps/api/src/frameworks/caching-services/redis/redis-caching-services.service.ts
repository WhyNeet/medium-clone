import { ICachingServices } from "@/core/abstracts/caching-services.abstract";
import { IGenericCachingRepository } from "@/core/abstracts/generic-caching-repository.abstract";
import { StoryDelta } from "@/core/dtos/story.dto";
import { Inject, Injectable } from "@nestjs/common";
import { RedisGenericRepository } from "./redis-generic-repository";

@Injectable()
export class RedisCachingServices implements ICachingServices {
	caching: IGenericCachingRepository<unknown>;

	constructor(
		@Inject("CachingRedis") cachingRedis: RedisGenericRepository<
			Record<string, StoryDelta>
		>,
	) {
		this.caching = cachingRedis;
	}
}
