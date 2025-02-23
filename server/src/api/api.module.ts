import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ApiJwtStrategy } from './strategy/api-jwt.strategy';
import { Project } from 'src/project/entities/project.entity';
import { ApiService } from './api.service';
import { Endpoint } from 'src/endpoint/entities/endpoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Endpoint]), PassportModule],
  controllers: [ApiController],
  providers: [ApiService, ApiJwtStrategy],
})
export class ApiModule {}
