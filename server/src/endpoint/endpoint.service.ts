import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateEndpointDTO, UpdateEndpointDTO } from './dto/endpoint.dto';
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

  async getOne(email: string, endpointId: string) {
    const endpoint = await this.endpointRepo.findOne({
      where: {
        userEmail: email,
        id: endpointId,
      },
    });

    if (!endpoint) {
      return { success: false, message: 'No endpoint found.' };
    }

    return {
      success: true,
      payload: endpoint,
    };
  }

  async update(email: string, updateEndpointDto: UpdateEndpointDTO) {
    try {
      const updatedEndpoint = await this.endpointRepo.update(
        { id: updateEndpointDto.id, userEmail: email },
        {
          ...updateEndpointDto,
        },
      );

      return {
        success: true,
        message:
          'Enpoint updated. Wait a few seconds before making any request to the endpoint.',
        payload: updatedEndpoint.raw[0],
      };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}
