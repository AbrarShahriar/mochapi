// src/logger/logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new CustomLogger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    // Log the incoming request
    this.logger.log(`Request: ${method} ${originalUrl}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;

      // Log the response
      this.logger.log(
        `Response: ${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
      );
    });

    res.on('error', (err) => {
      // Log the error
      this.logger.error(
        `Error: ${method} ${originalUrl} - ${err.message}`,
        err.stack,
      );
    });

    next();
  }
}
