import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";

export class ApplicationFactory {
	public static async create<M extends { new (...args: unknown[]): object }>(
		module: M,
	) {
		const app: INestApplication = await NestFactory.create(module);

		app.setGlobalPrefix("/api");

		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
			}),
		);

		app.use(cookieParser());

		return app;
	}
}
