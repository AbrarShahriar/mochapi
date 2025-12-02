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

  async getAllData(projectName: string, endpointName: string) {
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

  async getSingleData(projectName: string, endpointName: string, id: string) {
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

    const entry = endpoint.generatedData.filter((entry) => entry.id == id);

    if (!entry || entry.length == 0)
      return {
        message: `Entry with ID: "${id}" doesn't exist on endpoint: ${endpointName}`,
      };

    return entry[0];
  }

  async addData(projectName: string, endpointName: string, body: unknown) {
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

    if (!body || body == '')
      return {
        message: `Request body empty.`,
      };

    if (typeof body == 'object') {
      const oldEntries = endpoint.generatedData;

      const newEntry = {
        id: parseInt(oldEntries[oldEntries.length - 1].id as string) + 1,
        ...body,
      };

      const newEntries = [...oldEntries, newEntry];

      await this.endpointRepo.update(
        { id: endpoint.id },
        {
          generatedData: newEntries,
          numOfRows: endpoint.numOfRows + 1,
        },
      );

      return {
        message: 'Inserted Successfully',
      };
    }
  }

  async deleteData(projectName: string, endpointName: string, id: string) {
    if (!id)
      return {
        message: `Please provide ID of the entry you want to delete.`,
      };

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

    const oldEntries = endpoint.generatedData;

    const newEntries = oldEntries.filter((entry) => entry.id != id);

    await this.endpointRepo.update(
      { id: endpoint.id },
      { generatedData: newEntries, numOfRows: endpoint.numOfRows - 1 },
    );

    return {
      message: `Entry with ID: "${id}" deleted.`,
    };
  }
}
