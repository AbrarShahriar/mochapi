import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { Public } from 'src/decorators/public.decorator';
import { JwtTokenGuard } from './guards/jwt-token/api-jwt-token.guard';

@Public()
@UseGuards(JwtTokenGuard)
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('v1/:projectName/:endpointName')
  async getData(
    @Param('projectName') projectName: string,
    @Param('endpointName') endpointName: string,
  ) {
    return await this.apiService.getData(projectName, endpointName);
  }
}
