/* eslint-disable no-unused-vars */
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';

async function paginationMiddleware(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenation = '_id:-1' } = req.query;

    let [orderField, order] = ordenation.split(':');

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    const paginatedResult = await result
      .find()
      .sort({ [orderField]: order })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author')
      .exec();

    if (limit > 0 && page > 0) {
      if (paginatedResult.length > 0) return paginatedResult;
    }

    if (limit < 0 || page < 0) {
      throw new BadRequestException('Parâmetro de páginas deve ser positivo');
    }

    throw new NotFoundException('Nenhum registro encontrado');
  } catch (error) {
    next(new BadRequestException());
  }
}

export default paginationMiddleware;
