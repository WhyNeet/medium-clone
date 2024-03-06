import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CommonHttpException } from "../common/common-http.exception";
import type { Request, Response } from "express";

@Catch(CommonHttpException)
export class CommonHttpExceptionFilter
  implements ExceptionFilter<CommonHttpException>
{
  public catch(exception: CommonHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const instance = request.url;

    response.status(status).json({
      ...exception.getResponseError(),
      instance,
    });
  }
}
