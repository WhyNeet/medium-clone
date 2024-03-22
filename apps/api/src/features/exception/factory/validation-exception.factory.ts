import { CommonHttpException } from "@/frameworks/exception-handing/common/common-http.exception";
import { HttpException, HttpStatus, ValidationError } from "@nestjs/common";

export class ValidationExceptionFactory {
	public static transform(errors: ValidationError[]): HttpException {
		const exception = new CommonHttpException(
			"Validation/ValidationFailed",
			"Validation failed.",
			ValidationExceptionFactory.transformErrors(errors),
			HttpStatus.BAD_REQUEST,
		);

		return exception;
	}

	private static transformErrors(errors: ValidationError[]) {
		return errors.reduce((acc, error) => {
			const { property, constraints, children } = error;

			const exception = {
				constrains: [
					...Object.values(constraints ?? {}),
					...(acc[property] ?? []),
				],
				children: {
					...(children
						? ValidationExceptionFactory.transformErrors(children)
						: {}),
				},
			};

			acc[property] = exception;

			return acc;
		}, {});
	}
}
