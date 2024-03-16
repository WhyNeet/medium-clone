import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CommonHttpExceptionFilter } from "./filters/common-http-exception.filter";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

@Module({
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: CommonHttpExceptionFilter,
		},
	],
})
export class ExceptionHandlingModule {}
