import { StoryDeltasDto } from "@/core/dtos/story.dto";
import { ValidationExceptionFactory } from "@/features/exception/factory/validation-exception.factory";
import { GatewayCommonHttpExceptionFilter } from "@/frameworks/exception-handing/filters/gateway-common-http-exception.filter";
import { GatewayHttpExceptionFilter } from "@/frameworks/exception-handing/filters/gateway-http-exception.filter";
import { UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WsResponse,
} from "@nestjs/websockets";

@UseFilters(GatewayHttpExceptionFilter, GatewayCommonHttpExceptionFilter)
@UsePipes(
	new ValidationPipe({
		exceptionFactory: ValidationExceptionFactory.transform,
	}),
)
@WebSocketGateway({ path: "/story" })
export class StoryGateway {
	@SubscribeMessage("deltas")
	public async resolveDeltas(
		@MessageBody() data: StoryDeltasDto,
	): Promise<WsResponse<unknown>> {
		return { event: "deltas", data: { message: "received", data } };
	}
}
