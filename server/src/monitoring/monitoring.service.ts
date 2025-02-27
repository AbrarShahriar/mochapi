import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/external/services/redis.service';

@Injectable()
export class MonitoringService {
  constructor(private readonly redisService: RedisService) {}

  async getLogs(projectId: string, projectName: string, endpointName: string) {
    const logs = await this.redisService.getProjectLogs(
      projectId,
      projectName,
      endpointName,
    );

    return {
      success: true,
      payload: logs,
    };
  }
}
