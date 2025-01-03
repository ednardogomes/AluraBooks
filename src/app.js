import express from 'express';
import { mongoConnection } from './config/db_conection_mongodb.js';

import appRouter from './app-router.js';
import filtersMiddleware from './middlewars/filters-middleware.js';
import pageNotFoundMiddleware from './middlewars/page-not-found-middleware.js';

export const app = express();
app.use(express.json());

const conn = await mongoConnection();
conn.on('erro', (erro) => console.log('erro de conexão', erro.message));

app.use('/api', appRouter);
app.use(filtersMiddleware);
app.use(pageNotFoundMiddleware);

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is running');
});
