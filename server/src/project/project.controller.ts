import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { User } from '@clerk/backend';
import { CreateProjectDTO } from './dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('all')
  async getAll(@Req() req) {
    const user: User = req.user;
    return await this.projectService.getAll(
      user.emailAddresses[0].emailAddress,
    );
  }

  @Post('create')
  async create(@Req() req, @Body() body: CreateProjectDTO) {
    const user: User = req.user;
    return await this.projectService.create(
      user.emailAddresses[0].emailAddress,
      body,
    );
  }
}
