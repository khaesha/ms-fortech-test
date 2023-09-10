import express, { Express } from 'express';
import routes from './routes/index';
import cors from 'cors';
import { context as contextMiddleware } from './middlewares'
import config from './config';

const app: Express = express();

app.use(express.json({ limit: '5mb' }));
app.use(contextMiddleware);
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
