import bookService from '../service/book.service.js';

class BookController {
  async find(req, res, next) {
    try {
      const books = await bookService.find();
      res.status(200).send(books);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const book = await bookService.findById(id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  async addNewBook(req, res, next) {
    try {
      await bookService.addNewBook(req.body);
      res.status(201).json('Livro criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      await bookService.updateBook(req.params.id, req.body);
      res.status(200).json('Livro atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      await bookService.deleteBook(req.params.id);
      res.status(200).json('Livro deletado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async booksByPublisher(req, res, next) {
    try {
      const booksByPublisher = await bookService.booksByPublisher(
        req.query.publisher
      );
      res.status(200).json(booksByPublisher);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
