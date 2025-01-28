/* eslint-disable no-unused-vars */
import author from '../author/models/author.js';
import { BadRequestException } from '../exceptions/bad-request-exception.js';
import bookService from './book-service.js';
import book from './models/book.js';

class BookController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const book = await bookService.create(data);

      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const books = await bookService.find();

      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const book = await bookService.findOne(id);

      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async findByQueries(req, res, next) {
    try {
      const search = await processSearch(req.query);

      // if (!search) {
      //   return res.status(200).send([]);
      // }

      const book = await bookService.findByQueries(search);

      return res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const book = await bookService.update(id, data);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const message = await bookService.delete(id);

      res.json({ message });
    } catch (error) {
      next(error);
    }
  }
}

async function processSearch(querys) {
  let {
    title,
    publisher,
    minPage,
    maxPage,
    author: authorName,
    limit,
    page,
    orderField,
    order
  } = querys;

  // let [orderField, order] = ordenation.split(':');

  let search = {};

  const titleRegex = new RegExp(title, 'i');

  const authorRegex = new RegExp(authorName, 'i');

  const publisherRegex = new RegExp(publisher, 'i');

  const authorData = await author.findOne({ name: authorRegex });

  if (authorName) {
    const authorId = authorData.id;
    search.author = authorId;
  }

  if (title) {
    search.title = titleRegex;
  }

  if (publisher) {
    search.publisher = publisherRegex;
  }

  if (minPage || maxPage) {
    search.page = {};
  }

  if (minPage) {
    search.page.$gte = minPage;
  }
  if (maxPage) {
    search.page.$lte = maxPage;
  }

  if (limit < 0 || page < 0) {
    throw new BadRequestException('Não pode ser inserido valores negativos');
  }

  if (limit) search.limit = limit;

  if (page) search.page = page;

  if (order) search.order = order;

  if (orderField) search.orderField;

  return search;
}

export default new BookController();
