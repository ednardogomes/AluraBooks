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
      const books = await bookService.find();

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
      const {
        title,
        publisher,
        minPage,
        maxPage,
        author: authorName
      } = req.query;

      const titleRegex = new RegExp(title, 'i');

      const authorRegex = new RegExp(authorName, 'i');

      const publisherRegex = new RegExp(publisher, 'i');

      const authorData = await author.findOne({ name: authorRegex });

      let search = {};

      if (!authorName) {
        search = null;
      }

      if (!search) {
        res.status(200).send([]);
      }

      if (!authorData) {
        res.status(200).send([]);
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
        const book = await bookService.findByQueries(search);

        res.json(book);
      }
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

export default new BookController();
