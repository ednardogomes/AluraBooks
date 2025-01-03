/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';
import { UnauthorizedException } from '../exceptions/unauthorized-exception.js';
import { UnknownException } from '../exceptions/unknown-exception.js';

function filtersMiddleware(error, req, res, next) {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      error: 'SINTAX_ERROR',
      message: 'Invalid JSON format',
      details: error.message
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return error.send(res);
  }

  if (error instanceof BadRequestException) {
    return error.send(res);
  }

  if (error instanceof NotFoundException) {
    return error.send(res);
  }

  if (error instanceof UnauthorizedException) {
    return error.send(res);
  }

  return new UnknownException(error.massage).send(res);
}

export default filtersMiddleware;
