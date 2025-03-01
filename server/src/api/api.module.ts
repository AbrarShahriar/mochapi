import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ApiJwtStrategy } from './strategy/api-jwt.strategy';
import { Project } from 'src/project/entities/project.entity';
import { ApiService } from './api.service';
import { Endpoint } from 'src/endpoint/entities/endpoint.entity';
import { RedisService } from 'src/external/services/redis.service';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Endpoint]),
    PassportModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 1000 * 10,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 1000 * 60,
        limit: 100,
      },
    ]),
    CacheModule.register({
      ttl: 5000, // milliseconds
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, ApiJwtStrategy, RedisService, JwtService],
})
export class ApiModule {}
