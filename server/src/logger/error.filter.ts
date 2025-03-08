import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomLogger } from './logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new CustomLogger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (exception instanceof Error) {
      const cause = (exception as any).cause; // Access the cause of the error
      this.logger.error(
        `Error: ${request.method} ${request.url} - ${status}`,
        cause
          ? `${exception.message}\nCause: ${cause.message}\nStack: ${cause.stack}`
          : `${exception.message}\nStack: ${exception.stack}`,
      );
    } else {
      this.logger.error(
        `Error: ${request.method} ${request.url} - ${status}`,
        JSON.stringify(message),
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
