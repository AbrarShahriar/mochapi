import { RequestObj, ResponseObj } from 'src/interceptors/api-logger.types';
import { Project } from '../../project/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.endpoints, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column({ nullable: false })
  projectName: string;

  @Column({ nullable: false })
  endpointName: string;

  @Column({ nullable: false })
  method: string;

  @Column('jsonb', { nullable: true })
  request: RequestObj;

  @Column('jsonb', { nullable: true })
  response: ResponseObj;

  @Column('int')
  duration: number;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  userAgent: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
