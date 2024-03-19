import { ICachingServices } from "@/core/abstracts/caching-services.abstract";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisCachingServices } from "./redis-caching-services.service";
import { RedisGenericRepository } from "./redis-generic-repository";

@Module({
	providers: [
		{
			provide: "StoriesRedis",
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) =>
				await RedisGenericRepository.connect(
					{
						username: configService.get<string>(
							"caching.stories.auth.username",
						),
						password: configService.get<string>(
							"caching.stories.auth.password",
						),
						socket: {
							host: configService.get<string>("caching.stories.host"),
							port: configService.get<number>("caching.stories.port"),
						},
					},
					"storyContent",
				),
		},
		{
			provide: ICachingServices,
			useClass: RedisCachingServices,
		},
	],
})
export class RedisCachingServicesModule {}
