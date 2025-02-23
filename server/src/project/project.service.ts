import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProjectDTO } from './dto/project.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
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
      payload: projects.map((project) => ({
        ...project,
        region: this.configService.get('DB_REGION'),
      })),
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
      await this.dataSource.transaction(async (manager) => {
        // Insert the project inside the transaction
        const insertResult = await manager.insert(Project, {
          userEmail: email,
          name: projectDto.name,
        });

        // Get the inserted project ID
        const projectId = insertResult.identifiers[0].id;

        // Generate the API key
        const apiKey = jwt.sign(
          { projectId },
          this.configService.get('API_JWT_SECRET'),
        );

        // Update the project with the API key
        await manager.update(Project, projectId, { apiKey });
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

  async deleteProject(email: string, projectId: string) {
    const project = await this.projectRepo.findOne({
      where: {
        userEmail: email,
        id: projectId,
      },
    });
    if (!project) {
      return { success: false, message: 'Project not found.' };
    }

    try {
      await this.projectRepo.delete({ userEmail: email, id: projectId });
      return { success: true, message: `Project "${project.name}" deleted.` };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}
