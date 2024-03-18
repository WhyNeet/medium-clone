import { ICachingServices } from "@/core/abstracts/caching-services.abstract";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisCachingServices } from "./redis-caching-services.service";
import { RedisGenericRepository } from "./redis-generic-repository";

@Module({
	providers: [
		{
			provide: "StoriesRedis",
			useFactory: (configService: ConfigService) =>
				RedisGenericRepository.connect(
					{
						username: configService.get<string>("caching.stories.username"),
						password: configService.get<string>("caching.stories.password"),
					},
					"storyContent",
				),
			inject: [ConfigService],
		},
		{
			provide: ICachingServices,
			useClass: RedisCachingServices,
		},
	],
})
export class RedisCachingServicesModule {}
