import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { CreateEndpointDTO, UpdateEndpointDTO } from './dto/endpoint.dto';
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

  @Get('one/:endpointId')
  async getOne(@Param() params: { endpointId: string }, @Req() req) {
    const user: User = req.user;
    return await this.endpointService.getOne(
      user.emailAddresses[0].emailAddress,
      params.endpointId,
    );
  }

  @Patch('update')
  async update(@Body() updateEndpointDto: UpdateEndpointDTO, @Req() req) {
    const user: User = req.user;
    return await this.endpointService.update(
      user.emailAddresses[0].emailAddress,
      updateEndpointDto,
    );
  }

  @Delete('delete/:endpointId')
  async deleteProject(@Param() params: { endpointId: string }, @Req() req) {
    const user: User = req.user;
    return await this.endpointService.deleteEndpoint(
      user.emailAddresses[0].emailAddress,
      params.endpointId,
    );
  }
}
