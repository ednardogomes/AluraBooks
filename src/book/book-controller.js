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
