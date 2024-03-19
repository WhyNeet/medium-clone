import { CommonHttpException } from "@/frameworks/exception-handing/common/common-http.exception";
import { HttpException, HttpStatus, ValidationError } from "@nestjs/common";

export class ValidationExceptionFactory {
	public static transform(errors: ValidationError[]): HttpException {
		const exception = new CommonHttpException(
			"",
			"Validation failed.",
			errors.reduce((acc, val) => {
				const path = val.property;
				const exceptions = val.constraints;

				acc[path] = [...Object.values(exceptions), ...(acc[path] ?? [])];

				return acc;
			}, {}),
			HttpStatus.BAD_REQUEST,
		);

		return exception;
	}
}
