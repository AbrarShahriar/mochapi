import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async getAll(email: string) {
    return await this.projectRepo.find({
      where: {
        userEmail: email,
      },
      relations: {
        endpoints: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async create(email: string, projectDto: CreateProjectDTO) {
    const projects = await this.projectRepo.find({
      where: {
        userEmail: email,
      },
    });

    if (projects.length >= 3) {
      return {
        success: false,
        message: "Can't create more than 3 projects.",
      };
    }

    try {
      const apiKey = crypto.randomUUID();
      await this.projectRepo.insert({
        userEmail: email,
        name: projectDto.name,
        apiKey,
      });
      return {
        success: true,
        message: `Project ${projectDto.name} successfully created.`,
      };
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException(
        `Couldn't create ${projectDto.name}`,
      );
    }
  }
}
