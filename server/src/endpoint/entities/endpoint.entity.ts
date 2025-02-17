import { EndpointSchema } from 'src/types/database-types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Endpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userEmail: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'simple-json', default: [] })
  schema: EndpointSchema[];

  @Column({
    type: 'simple-json',
    default: [],
  })
  generatedData: Record<string, any>[];

  @Column({
    default: true,
  })
  isPublic: boolean;

  @Column({
    default: 1,
  })
  numOfRows: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
