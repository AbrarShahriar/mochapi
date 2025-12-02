import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Analytics } from './entities/analytics.entity';
import { Between, Repository } from 'typeorm';
import { LogEntry } from 'src/interceptors/api-logger.types';

@Injectable()
export class AnalyticsService {
  private redis: Redis;

  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepo: Repository<Analytics>,
  ) {}

  async logRequest(
    projectId: string,
    projectName: string,
    endpointName: string,
    logEntry: LogEntry,
  ) {
    await this.analyticsRepo.insert({
      project: { id: projectId },
      projectName,
      endpointName,
      ...logEntry,
    });
  }

  async getEndpointLogs(
    projectId: string,
    projectName: string,
    endpointName: string,
  ) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const logEntries = await this.analyticsRepo.find({
      where: {
        project: { id: projectId },
        projectName,
        endpointName,
        createdAt: Between(sevenDaysAgo, today),
      },
      order: { createdAt: 'DESC' },
    });

    return { payload: logEntries };
  }
}
