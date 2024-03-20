import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CommonHttpException } from "../common/common-http.exception";

@Catch(CommonHttpException)
export class GatewayCommonHttpExceptionFilter implements ExceptionFilter {
	public catch(exception: CommonHttpException, host: ArgumentsHost) {
		const ctx = host.switchToWs();
		const client = ctx.getClient();
		const pattern = ctx.getPattern();

		this.handleError(client, exception, pattern);
	}

	private handleError(
		client: WebSocket,
		exception: CommonHttpException,
		pattern: string,
	) {
		const data = JSON.stringify({
			...exception.getResponseError(),
			instance: pattern,
		});

		client.send(data);
	}
}
