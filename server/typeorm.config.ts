import { DataSource } from 'typeorm';
import { User } from './src/user/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ep-soft-bread-a18bvchi.ap-southeast-1.aws.neon.tech',
  username: 'mochapi_owner',
  password: 'YLvjge1Xcyb9',
  database: 'mochapi',
  ssl: true,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: true,
  logger: 'advanced-console',
});

export default AppDataSource;
