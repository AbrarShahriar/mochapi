import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Project } from './project/entities/project.entity';
import { Endpoint } from './endpoint/entities/endpoint.entity';
import { Function } from './functions/entities/function.entity';

config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  entities: [Project, Endpoint, Function],
  migrations: [`${__dirname}/migrations/**/*.ts`],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: true,
  logger: 'advanced-console',
};

const AppDataSource = new DataSource(typeormConfig);

export default AppDataSource;
