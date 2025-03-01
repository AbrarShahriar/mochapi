import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging.middleware';
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
import { RedisService } from './external/services/redis.service';
import { MonitoringModule } from './monitoring/monitoring.module';
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
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
