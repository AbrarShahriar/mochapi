import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { RedisService } from 'src/external/services/redis.service';

@Module({
  controllers: [MonitoringController],
  providers: [MonitoringService, RedisService],
})
export class MonitoringModule {}
