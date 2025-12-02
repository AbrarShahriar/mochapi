import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  Version,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { Public } from 'src/decorators/public.decorator';
import { JwtTokenGuard } from './guards/jwt-token/api-jwt-token.guard';
import { ApiLoggerInterceptor } from 'src/interceptors/api-logger.interceptor';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Public()
@UseGuards(ThrottlerGuard)
@UseInterceptors(CacheInterceptor)
@UseInterceptors(ApiLoggerInterceptor)
@UseGuards(JwtTokenGuard)
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Version('1')
  @Get(':projectName/:endpointName')
  async getAllData(
    @Param('projectName') projectName: string,
    @Param('endpointName') endpointName: string,
  ) {
    return await this.apiService.getAllData(projectName, endpointName);
  }

  @Version('1')
  @Get(':projectName/:endpointName/:id')
  async getSingleData(
    @Param('projectName') projectName: string,
    @Param('endpointName') endpointName: string,
    @Param('id') id: string,
  ) {
    return await this.apiService.getSingleData(projectName, endpointName, id);
  }

  @Version('1')
  @Post(':projectName/:endpointName')
  async addData(
    @Body() body: unknown,
    @Param('projectName') projectName: string,
    @Param('endpointName') endpointName: string,
  ) {
    return await this.apiService.addData(projectName, endpointName, body);
  }

  @Version('1')
  @Delete(':projectName/:endpointName/:id')
  async deleteData(
    @Param('projectName') projectName: string,
    @Param('endpointName') endpointName: string,
    @Param('id') id: string,
  ) {
    return await this.apiService.deleteData(projectName, endpointName, id);
  }
}
