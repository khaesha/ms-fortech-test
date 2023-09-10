import 'dotenv/config';

export default {
  port: process.env.PORT || 8000,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    dialect: 'mysql',
    logging: process.env.DB_LOGGING ? console.log : false
  },
  jwt: {
    secret: process.env.SECRET || 'your-secret-key',
    expiry: process.env.JWT_EXPIRY
  }
};
