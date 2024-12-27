import bookRepository from '../repositories/books/book.repository.js';

class BookService {
  async find() {
    const books = await bookRepository.find();
    return books;
  }

  async findById(id) {
    const bookById = await bookRepository.findById(id);
    return bookById;
  }

  async addNewBook(data) {
    const newBook = await bookRepository.addNewBook(data);
    return newBook;
  }

  async updateBook(id, data) {
    const updateBook = await bookRepository.updateBook(id, data);
    return updateBook;
  }

  async deleteBook(id) {
    const deleteBook = await bookRepository.deleteBook(id);
    return deleteBook;
  }

  async booksByPublisher(data) {
    const bookForPublisher = await bookRepository.booksByPublisher(data);
    return bookForPublisher;
  }
}

export default new BookService();
