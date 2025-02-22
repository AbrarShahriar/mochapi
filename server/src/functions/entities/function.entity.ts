import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Function {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userEmail: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  callSignature: string;

  @Column()
  description: string;

  @Column()
  functionBody: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
