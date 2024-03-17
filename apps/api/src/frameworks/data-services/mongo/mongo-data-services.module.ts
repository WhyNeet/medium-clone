import { IDataServices } from "@/core/abstracts/data-services.abstract";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import {
	Story,
	StorySchema,
	Token,
	TokenSchema,
	User,
	UserSchema,
} from "./model";
import { MongoDataServices } from "./mongo-data-services.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Token.name, schema: TokenSchema },
			{ name: Story.name, schema: StorySchema },
		]),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					uri: `mongodb://${configService.get<string>(
						"mongodb.host",
					)}:${configService.get<string>("mongodb.port")}`,
					dbName: "medium",
					auth: {
						username: configService.get<string>("mongodb.auth.username"),
						password: configService.get<string>("mongodb.auth.password"),
					},
				};
			},
		}),
	],
	providers: [
		{
			provide: IDataServices,
			useClass: MongoDataServices,
		},
	],
	exports: [IDataServices],
})
export class MongoDataServicesModule {}
