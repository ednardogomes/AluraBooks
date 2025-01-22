/* eslint-disable no-unused-vars */
import author from '../author/models/author.js';
import bookService from './book-service.js';

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
      const { limit = 5, page = 1 } = req.query;

      const books = await bookService.find(limit, page);

      res.json(books);
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

      if (!search) {
        res.status(200).send([]);
      }
      const book = await bookService.findByQueries(search);

      res.json(book);
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
  const { title, publisher, minPage, maxPage, author: authorName } = querys;

  const titleRegex = new RegExp(title, 'i');

  const authorRegex = new RegExp(authorName, 'i');

  const publisherRegex = new RegExp(publisher, 'i');

  const authorData = await author.findOne({ name: authorRegex });

  let search = {};

  if (!authorName || !authorData) {
    search = null;
  }

  if (authorName) {
    if (title) search.title = titleRegex;

    if (publisher) search.publisher = publisherRegex;

    if (minPage || maxPage) search.page = {};

    if (minPage) search.page.$gte = minPage;
    if (maxPage) search.page.$lte = maxPage;

    if (authorData) {
      const authorId = authorData.id;
      search.author = authorId;
    }
  }
  console.log(search);
  return search;
}

export default new BookController();
