import { CommonException } from "@/frameworks/exception-handing/decorators/common-exception.decorator";
import { Exception } from "@/frameworks/exception-handing/types/exception.interface";
import { HttpStatus } from "@nestjs/common";

export class AuthException {
	@CommonException(
		"User does not exist.",
		"User with this email does not exist.",
		HttpStatus.BAD_REQUEST,
	)
	public static readonly UserDoesNotExist: Exception;

	@CommonException(
		"Wrong password.",
		"Wrong password provided.",
		HttpStatus.BAD_REQUEST,
	)
	public static readonly WrongPassword: Exception;
}
