import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis(configService.get('REDIS_URL'));
    this.redis.on('connect', () => console.log('REDIS:: Connected'));
    this.redis.on('error', () => console.log('REDIS:: Error'));
  }

  async logRequest(
    projectId: string,
    projectName: string,
    endpointName: string,
    logEntry: any,
  ) {
    const key = `logs:${projectId}:${projectName}:${endpointName}`;
    const timestamp = Date.now();

    await this.redis.zadd(key, timestamp, JSON.stringify(logEntry));
    await this.redis.expire(key, 604800); // 7 days (604800 seconds)
    await this.redis.hincrby(`analytics:${projectId}`, endpointName, 1);
  }

  async getProjectLogs(
    projectId: string,
    projectName: string,
    endpointName: string,
  ) {
    const key = `logs:${projectId}:${projectName}:${endpointName}`;

    // Retrieve logs from the last 7 days
    const logs = await this.redis.zrangebyscore(
      key,
      Date.now() - 604800000,
      Date.now(),
    );

    return logs.map((log) => JSON.parse(log));
  }

  async getAnalytics(projectId: string) {
    return await this.redis.hgetall(`analytics:${projectId}`);
  }
}
