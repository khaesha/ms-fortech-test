import { Sequelize, Op } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.database.name as string,
  config.database.username as string,
  config.database.password,
  {
    dialect: 'mysql',
    host: config.database.host,
    logging: console.log
  }
);

export { sequelize, Sequelize, Op };
