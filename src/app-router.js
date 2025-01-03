import { Router } from 'express';
import authorRouter from './author/author-router.js';
import bookRouter from './book/book-router.js';

const appRouter = Router();

appRouter.use('/author', authorRouter).use('/book', bookRouter);

export default appRouter;
