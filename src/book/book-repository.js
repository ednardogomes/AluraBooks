import { NotFoundException } from '../exceptions/not-found-exception.js';
import Book from './models/book.js';

class BookRepository {
  async create(data) {
    return await Book.create(data);
  }

  async find() {
    const books = await Book.find();
    return books;
  }

  async findByQueries(query = {}) {
    const books = await Book.find(query).populate('author');
    if (books.length > 0) return books;

    throw new NotFoundException('Nenhum registro encontrado');
  }

  async findOne(id) {
    const book = await Book.findById(id).populate('author');
    if (book) return book;

    throw new NotFoundException('Book not found');
  }

  async update(id, data) {
    const book = await this.findOne(id);
    await Book.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          title: data?.title ?? book.title,
          publisher: data?.publisher ?? book.publisher,
          price: data?.price ?? book.price,
          page: data?.page ?? book.page,
          author: data?.author ?? book.author
        }
      }
    );
    return 'Book updated';
  }

  async delete(id) {
    await this.findOne(id);
    await Book.deleteOne({ id });

    return 'Book deleted';
  }
}

export default new BookRepository();
