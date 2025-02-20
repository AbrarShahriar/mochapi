import { Body, Controller, Post, Req } from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { CreateEndpointDTO } from './dto/endpoint.dto';
import { User } from '@clerk/backend';

@Controller('endpoints')
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Post('create')
  async create(@Req() req, @Body() body: CreateEndpointDTO) {
    const user: User = req.user;
    return await this.endpointService.create(
      user.emailAddresses[0].emailAddress,
      body,
    );
  }
}
