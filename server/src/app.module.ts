import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from './logger/logging.middleware';
import { typeormConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { EndpointModule } from './endpoint/endpoint.module';
import { ClerkClientProvider } from './auth/providers/clerk-client.provider';
import { APP_GUARD } from '@nestjs/core';
import { ClerkAuthGuard } from './auth/guards/clerk-auth.guard';
import { FunctionsModule } from './functions/functions.module';
import { ApiModule } from './api/api.module';
import { JwtModule } from '@nestjs/jwt';
import * as cors from 'cors';
import { SignatureValidationMiddleware } from './middleware/signature-validation.middleware';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig),

    JwtModule,
    AuthModule,
    ProjectModule,
    EndpointModule,
    FunctionsModule,
    ApiModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    AppService,
    ClerkClientProvider,
  ],
})
export class AppModule {
  private excludedMethodForAPI: {
    path: string;
    method: RequestMethod;
    version: string;
  }[] = [
    {
      path: '/api/:projectName/:endpointName',
      method: RequestMethod.GET,
      version: '1',
    },
    {
      path: '/api/:projectName/:endpointName/:id',
      method: RequestMethod.GET,
      version: '1',
    },
    {
      path: '/api/:projectName/:endpointName',
      method: RequestMethod.POST,
      version: '1',
    },
    {
      path: '/api/:projectName/:endpointName/:id',
      method: RequestMethod.DELETE,
      version: '1',
    },
  ];

  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    // API Endpoint method restriction middleware
    consumer
      .apply(SignatureValidationMiddleware)
      .exclude(...this.excludedMethodForAPI)
      .forRoutes('*');

    // Logging middleware
    consumer.apply(LoggingMiddleware).forRoutes('*');

    // CORS middleware
    consumer
      .apply(
        cors({
          origin: (
            requestOrigin: string,
            callback: (err: Error, origin?: boolean) => void,
          ) => {
            const allowedOrigins = [
              this.configService.get<string>('CORS_ORIGIN'),
            ];
            callback(null, allowedOrigins.includes(requestOrigin));
          },
          credentials: true,
        }),
      )
      .exclude(...this.excludedMethodForAPI)
      .forRoutes('*');
  }
}
