import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Endpoint } from 'src/endpoint/entities/endpoint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Endpoint)
    private readonly endpointRepo: Repository<Endpoint>,
  ) {}

  async getData(projectName: string, endpointName: string) {
    const endpoint = await this.endpointRepo.findOne({
      where: {
        name: endpointName,
        project: { name: projectName },
      },
    });

    if (!endpoint)
      return {
        message: `Endpoint "${endpointName}" doesn't exist on project: ${projectName}`,
      };

    if (!endpoint.isPublic) {
      throw new UnauthorizedException('API Endpoint is private');
    }

    return endpoint.generatedData;
  }
}
