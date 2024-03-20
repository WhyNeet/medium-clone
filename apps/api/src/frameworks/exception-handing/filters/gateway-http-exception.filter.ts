import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class GatewayHttpExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToWs();
		const client = ctx.getClient();
		const pattern = ctx.getPattern();

		this.handleError(client, exception, pattern);
	}

	private handleError(
		client: WebSocket,
		exception: HttpException,
		pattern: string,
	) {
		const data = JSON.stringify({
			type: "UnhandledException",
			title: exception.name,
			detail: exception.message,
			instance: pattern,
		});

		client.send(data);
	}
}
