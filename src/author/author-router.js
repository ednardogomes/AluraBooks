import { Router } from 'express';
import authorController from './author-controller.js';

const authorRouter = Router();

authorRouter
  .post('/', authorController.create)
  .get('/', authorController.find)
  .get('/:id', authorController.findOne)
  .put('/:id', authorController.update)
  .delete('/:id', authorController.delete);

export default authorRouter;
