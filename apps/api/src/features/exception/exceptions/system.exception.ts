import { CommonException } from "@/frameworks/exception-handing/decorators/common-exception.decorator";
import type { CustomizableException } from "@/frameworks/exception-handing/types/exception.interface";
import { HttpStatus } from "@nestjs/common";

export class SystemException {
	@CommonException(
		"An internal error occured.",
		"Please, try again later.",
		HttpStatus.INTERNAL_SERVER_ERROR,
	)
	public static readonly InternalException: CustomizableException;
}
