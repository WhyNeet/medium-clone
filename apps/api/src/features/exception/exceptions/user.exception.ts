import { CommonException } from "@/frameworks/exception-handing/decorators/common-exception.decorator";
import { CustomizableException } from "@/frameworks/exception-handing/types/exception.interface";
import { HttpStatus } from "@nestjs/common";

export class UserException {
  @CommonException(
    "User does not exist.",
    "User with this identity does not exist.",
    HttpStatus.BAD_REQUEST,
  )
  public static readonly UserDoesNotExist: CustomizableException;
}
