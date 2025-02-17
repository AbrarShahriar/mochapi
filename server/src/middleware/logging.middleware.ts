import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private count: number = 1;
  use(req: Request, res: Response, next: NextFunction) {
    const count = this.count;
    console.log(`-------- Incoming requst: ID #${this.count} --------`);
    console.log('Incoming request path:', req.originalUrl);
    console.log('Incoming request headers:', req.headers);
    console.log('Incoming request body:', req.body);

    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: Buffer[] = [];

    res.write = function (chunk: any, ...args: any[]) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return oldWrite.apply(res, [chunk, ...args]);
    };

    res.end = function (chunk: any, ...args: any[]) {
      if (chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const responseBody = Buffer.concat(chunks).toString('utf8');
      console.log('Outgoing response status:', res.statusCode);
      console.log('Outgoing response body:', responseBody);
      console.log(`-------- END #${count} --------`);

      return oldEnd.apply(res, [chunk, ...args]);
    };

    this.count++;
    next();
  }
}
