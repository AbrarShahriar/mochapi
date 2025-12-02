import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/logs')
  async getLogs(
    @Query('projectId') projectId: string,
    @Query('projectName') projectName: string,
    @Query('endpointName') endpointName: string,
  ) {
    return await this.analyticsService.getEndpointLogs(
      projectId,
      projectName,
      endpointName,
    );
  }
}
