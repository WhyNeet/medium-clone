import { CommonException } from "@/frameworks/exception-handing/decorators/common-exception.decorator";
import { Exception } from "@/frameworks/exception-handing/types/exception.interface";
import { HttpStatus } from "@nestjs/common";

export class StoryException {
	@CommonException(
		"Story does not exist.",
		"Story with ID provided does not exist.",
		HttpStatus.BAD_REQUEST,
	)
	public static readonly StoryDoesNotExist: Exception;
}
