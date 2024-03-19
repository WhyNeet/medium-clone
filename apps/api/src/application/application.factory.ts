import { ValidationExceptionFactory } from "@/features/exception/factory/validation-exception.factory";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from "@nestjs/platform-ws";
import cookieParser from "cookie-parser";

export class ApplicationFactory {
	public static async create<M extends { new (...args: unknown[]): object }>(
		module: M,
	) {
		const app: INestApplication = await NestFactory.create(module);

		app.useWebSocketAdapter(new WsAdapter(app));

		app.setGlobalPrefix("/api");

		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				exceptionFactory: ValidationExceptionFactory.transform,
			}),
		);

		app.use(cookieParser());

		return app;
	}
}
