import { ICachingServices } from "@/core/abstracts/caching-services.abstract";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisCachingServices } from "./redis-caching-services.service";
import { RedisGenericRepository } from "./redis-generic-repository";

@Module({
	providers: [
		{
			provide: "CachingRedis",
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) =>
				await RedisGenericRepository.connect({
					username: configService.get<string>("redis.caching.auth.username"),
					password: configService.get<string>("redis.caching.auth.password"),
					socket: {
						host: configService.get<string>("redis.caching.host"),
						port: configService.get<number>("redis.caching.port"),
					},
				}),
		},
		{
			provide: ICachingServices,
			useClass: RedisCachingServices,
		},
	],
	exports: [ICachingServices],
})
export class RedisCachingServicesModule {}
