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

      let search = {};

      if (!search) {
        res.status(200).send([]);
      }

      if (title) search.title = titleRegex;
      if (publisher) search.publisher = publisher;

      if (minPage || maxPage) search.page = {};

      if (minPage) search.page.$gte = minPage;
      if (maxPage) search.page.$lte = maxPage;

      if (authorName) {
        const authorData = await author.findOne({ name: authorName });
        const authorId = authorData.id;
        search.author = authorId;
      }

      const testeIf = () => console.log('entrei no if');
      if (author === '') {
        search.author = null;
      }

      console.log(search);
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

export default new BookController();
