import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';

interface ApiJwtPayload {
  projectId: string;
}

@Injectable()
export class ApiJwtStrategy extends PassportStrategy(
  Strategy,
  'api-jwt-token',
) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('API_JWT_SECRET'),
    });
  }

  async validate(payload: ApiJwtPayload) {
    try {
      const project = await this.projectRepo.findOne({
        where: { id: payload.projectId },
        relations: { endpoints: true },
      });

      if (!project) {
        throw new UnauthorizedException('Project not found');
      }

      return project; // Return the payload to the request object
    } catch (error) {
      throw new UnauthorizedException((error as Error).message, error);
    }
  }
}
