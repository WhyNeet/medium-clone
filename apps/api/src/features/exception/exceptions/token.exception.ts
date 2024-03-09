import { CommonException } from "@/frameworks/exception-handing/decorators/common-exception.decorator";
import {
  CustomizableException,
  Exception,
} from "@/frameworks/exception-handing/types/exception.interface";
import { HttpStatus } from "@nestjs/common";

export class TokenException {
  @CommonException(
    "Invalid token provided.",
    "Please, provide a valid access token.",
    HttpStatus.UNAUTHORIZED,
  )
  public static readonly InvalidAccessTokenProvided: Exception;

  @CommonException(
    "Invalid token provided.",
    "Please, provide a valid refresh token.",
    HttpStatus.UNAUTHORIZED,
  )
  public static readonly InvalidRefreshTokenProvided: Exception;

  @CommonException(
    "Invalid token provided.",
    "Please, provide a valid api token.",
    HttpStatus.UNAUTHORIZED,
  )
  public static readonly InvalidApiTokenProvided: Exception;

  @CommonException(
    "Token cannot be used.",
    "The token provided cannot be used on this scope.",
    HttpStatus.UNAUTHORIZED,
  )
  public static readonly InvalidApiTokenScope: CustomizableException;

  @CommonException(
    "Invalid token scope specified.",
    "Please, specify an existing API token scope.",
    HttpStatus.BAD_REQUEST,
  )
  public static readonly InvalidApiTokenScopeSpecified: CustomizableException;
}
