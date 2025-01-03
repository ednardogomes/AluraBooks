import { NotFoundException } from '../exceptions/not-found-exception.js';

/* eslint-disable no-unused-vars */
function pageNotFoundMiddleware(req, res, next) {
  return new NotFoundException('Route not found').send(res);
}

export default pageNotFoundMiddleware;
