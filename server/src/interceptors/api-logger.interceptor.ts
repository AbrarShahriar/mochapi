import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../external/services/redis.service';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { Request } from 'express';

@Injectable()
export class ApiLoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    // Get project name and endpoint from URL params
    const projectName = request.params.projectName;
    const endpointName = request.params.endpointName;

    // Extract projectId from JWT token
    const authHeader = request.headers.authorization;
    let projectId = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get<string>('API_JWT_SECRET'),
        });
        projectId = payload.projectId;
      } catch (error) {
        console.error(error);
        throw new UnauthorizedException('Not a valid token');
      }
    }

    return next.handle().pipe(
      tap(async (responseBody) => {
        const duration = Date.now() - startTime;

        const responseObj = { message: null, statusCode: 0, size: 0 };
        if (responseBody.success) {
          responseObj.message = responseBody.message;
        }
        responseObj.statusCode = response.statusCode;
        responseObj.size = JSON.stringify(responseBody).length * 2;

        console.log('host', request.headers.host);
        console.log('referer', request.headers.referer);
        console.log('origin', request.headers.origin);

        const logEntry = {
          timestamp: DateTime.now().setZone('Asia/Dhaka').toISO(),
          projectId,
          projectName,
          endpointName,
          method: request.method,
          request: { path: request.path, host: request.headers.referer },
          response: responseObj,
          duration,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        };

        await this.redisService.logRequest(
          projectId,
          projectName,
          endpointName,
          logEntry,
        );
      }),
    );
  }
}
