import { Controller } from '@nestjs/common';
import { EndpointService } from './endpoint.service';

@Controller('endpoint')
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}
}
