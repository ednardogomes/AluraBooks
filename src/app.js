/* eslint-disable no-unused-vars */
import express from 'express';
import bookRouter from './routes/book.router.js';
import { conectToDB } from './config/db_conection_mongodb.js';
import autorRouter from './routes/autor.router.js';
import mongoose from 'mongoose';
import manipuladorDeErros from './middlewars/manipuladorDeErros.js';

export const app = express();
app.use(express.json());
const conectDb = await conectToDB();
conectDb.on('erro', (erro) => console.log('erro de conexão', erro));
conectDb.once('open', () =>
  console.log('Conexão com o banco feita com sucesso')
);

app.use('/books', bookRouter);
app.use('/authors', autorRouter);
app.use(manipuladorDeErros);

const port = process.env.PORT;
app.listen(port);
console.log(`Porta ${port}`);
