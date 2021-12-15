import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ResponseErrorTypeEnum } from '../enums';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): FastifyReply {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const exceptionBody: any = exception.getResponse();
    const messageObj =
      exceptionBody.message === 'Unauthorized'
        ? { property: '[empty]', message: exceptionBody.message }
        : exception.getResponse();

    if (exceptionBody.type === ResponseErrorTypeEnum.SCHEMA_VALIDATION_ERROR) {
      response
        .status(exception.getStatus())
        .send({ statusCode: exception.getStatus(), messages: exceptionBody.errors });
    }
    console.log('My error message', { statusCode: exception.getStatus(), messages: [messageObj] });
    return response
      .status(exception.getStatus())
      .send({ statusCode: exception.getStatus(), messages: [messageObj] });
  }
}
