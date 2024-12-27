import { Router } from 'express';
import autorController from '../controllers/autor.controller.js';

const autorRouter = Router();

autorRouter
  .get('/', autorController.find)
  .post('/', autorController.addNewAutor)
  .get('/:id', autorController.findById)
  .put('/:id', autorController.updateAutor)
  .delete('/:id', autorController.deleteAutor);

export default autorRouter;
