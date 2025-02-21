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
    const projects = await this.projectRepo.find({
      where: {
        userEmail: email,
      },
      relations: {
        endpoints: true,
      },
      order: { createdAt: 'DESC' },
    });
    return {
      success: true,
      payload: projects,
    };
  }

  async getOne(email: string, projectId: string) {
    const project = await this.projectRepo.findOne({
      where: {
        userEmail: email,
        id: projectId,
      },
      relations: {
        endpoints: true,
      },
    });

    if (!project) {
      return { success: false, message: 'No project found.' };
    }

    return {
      success: true,
      payload: project,
    };
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
