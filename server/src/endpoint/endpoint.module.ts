import { Module } from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { EndpointController } from './endpoint.controller';

@Module({
  controllers: [EndpointController],
  providers: [EndpointService],
})
export class EndpointModule {}
