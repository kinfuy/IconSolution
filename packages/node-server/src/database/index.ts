import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { iconPkg, Icons, User, Task } from './entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '19980518',
  database: 'iconServer',
  entities: [iconPkg, Icons, User, Task],
  synchronize: false,
  logging: false,
});

export const dbStart = () => {
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
    })
    .catch((error) => console.log(error));
};
