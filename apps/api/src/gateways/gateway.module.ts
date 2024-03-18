import { Module } from "@nestjs/common";
import { StoryGateway } from "./story.gateway";

@Module({
	imports: [],
	providers: [StoryGateway],
})
export class GatewayModule {}
