import { Router } from 'express';
import bookController from '../controllers/book.controller.js';

const bookRouter = Router();

bookRouter
  .get('/', bookController.find)
  .post('/', bookController.addNewBook)
  .get('/search', bookController.booksByPublisher)
  .get('/:id', bookController.findById)
  .put('/:id', bookController.updateBook)
  .delete('/:id', bookController.deleteBook);

export default bookRouter;
