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

  async deleteProjectData(projectId: string): Promise<number> {
    const logKeys = await this.redis.keys(`logs:${projectId}:*`);

    let deletedCount = 0;

    const multi = this.redis.multi();

    if (logKeys.length > 0) {
      multi.del(...logKeys);
      deletedCount += logKeys.length;
    }

    await multi.exec();

    return deletedCount;
  }

  async deleteEndpointData(
    projectId: string,
    projectName: string,
    endpointName: string,
  ): Promise<{ logsDeleted: boolean }> {
    const result = { logsDeleted: false };

    console.log('endpointboom', projectId, projectName, endpointName);

    const logKey = `logs:${projectId}:${projectName}:${endpointName}`;
    console.log('endpointboom:keys', logKey);
    const logExists = await this.redis.exists(logKey);

    if (logExists) {
      await this.redis.del(logKey);
      result.logsDeleted = true;
    }

    return result;
  }
}
