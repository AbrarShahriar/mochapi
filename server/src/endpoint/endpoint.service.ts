import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateEndpointDTO } from './dto/endpoint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endpoint } from './entities/endpoint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EndpointService {
  constructor(
    @InjectRepository(Endpoint)
    private readonly endpointRepo: Repository<Endpoint>,
  ) {}

  async create(email: string, endpointDto: CreateEndpointDTO) {
    const endpoints = await this.endpointRepo.find({
      where: {
        userEmail: email,
        project: { id: endpointDto.projectId },
      },
    });

    if (endpoints.length >= 3) {
      return {
        success: false,
        message: "Can't create more than 3 endpoints.",
      };
    }

    try {
      const insertedEndpoint = await this.endpointRepo.insert({
        userEmail: email,
        name: endpointDto.name,
        project: { id: endpointDto.projectId },
      });
      return {
        success: true,
        message: `endpoint ${endpointDto.name} successfully created.`,
        payload: insertedEndpoint,
      };
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException(
        `Couldn't create ${endpointDto.name}`,
      );
    }
  }
}
