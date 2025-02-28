import { Controller, Get, Query } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get('/logs')
  async getLogs(
    @Query('projectId') projectId: string,
    @Query('projectName') projectName: string,
    @Query('endpointName') endpointName: string,
  ) {
    return await this.monitoringService.getLogs(
      projectId,
      projectName,
      endpointName,
    );
  }
}
