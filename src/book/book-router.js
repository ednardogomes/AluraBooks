import { Router } from 'express';
import bookController from './book-controller.js';

const bookRouter = Router();

bookRouter
  .post('/', bookController.create)
  .get('/', bookController.find)
  .get('/search', bookController.findByQueries)
  .get('/:id', bookController.findOne)
  .put('/:id', bookController.update)
  .delete('/:id', bookController.delete);

export default bookRouter;
