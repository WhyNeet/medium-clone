import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		BullModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				redis: {
					host: configService.get<string>("redis.queue.host"),
					port: configService.get<number>("redis.queue.port"),
					username: configService.get<string>("redis.queue.auth.username"),
					password: configService.get<string>("redis.queue.auth.password"),
				},
			}),
		}),
	],
	exports: [BullModule],
})
export class QueueProcessingServicesModule {}
