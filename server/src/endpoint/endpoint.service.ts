import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEndpointDTO, UpdateEndpointDTO } from './dto/endpoint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endpoint } from './entities/endpoint.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/external/services/redis.service';

@Injectable()
export class EndpointService {
  constructor(
    @InjectRepository(Endpoint)
    private readonly endpointRepo: Repository<Endpoint>,
    private readonly redisService: RedisService,
  ) {}

  async create(email: string, endpointDto: CreateEndpointDTO) {
    const endpoints = await this.endpointRepo.find({
      where: {
        userEmail: email,
        project: { id: endpointDto.projectId },
      },
    });

    const endpointExists = endpoints.filter(
      (endpoint) => endpoint.name === endpointDto.name,
    );
    if (endpointExists && endpointExists.length > 0) {
      return {
        success: false,
        message: `Endpoint with name "${endpointDto.name}" already exists.`,
      };
    }

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
      throw new BadRequestException((error as Error).message, error);
    }
  }

  async getOne(email: string, endpointId: string) {
    const endpoint = await this.endpointRepo.findOne({
      where: {
        userEmail: email,
        id: endpointId,
      },
      relations: { project: true },
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
      throw new BadRequestException((error as Error).message, error);
    }
  }

  async deleteEndpoint(email: string, endpointId: string) {
    const endpoint = await this.endpointRepo.findOne({
      where: {
        userEmail: email,
        id: endpointId,
      },
      relations: { project: true },
    });

    if (!endpoint) {
      return { success: false, message: 'Project not found.' };
    }

    try {
      await this.endpointRepo.delete({ userEmail: email, id: endpointId });

      await this.redisService.deleteEndpointData(
        endpoint.project.id,
        endpoint.project.name,
        endpoint.name,
      );
      return { success: true, message: `Endpoint "${endpoint.name}" deleted.` };
    } catch (error) {
      throw new BadRequestException((error as Error).message, error);
    }
  }
}
