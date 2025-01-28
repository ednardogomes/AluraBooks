// import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { NotFoundException } from '../exceptions/not-found-exception.js';
import Book from './models/book.js';

class BookRepository {
  async create(data) {
    return await Book.create(data);
  }

  async find() {
    // let { limit = 5, page = 1, orderField = '_id', order = '-1' } = ;

    // limit = parseInt(limit);
    // page = parseInt(page);
    // order = parseInt(order);

    const books = await Book.find();
    //   .sort({ [orderField]: order })
    //   .skip((page - 1) * limit)
    //   .limit(limit)
    //   .exec();

    // if (limit > 0 && page > 0) {
    //   if (paginatedResult.length > 0) return paginatedResult;
    // }

    // if (limit < 0 || page < 0) {
    //   throw new BadRequestException('Parâmetro de páginas deve ser positivo');
    // }

    // throw new NotFoundException('Nenhum registro encontrado');

    return books;
  }

  async findOne(id) {
    const book = await Book.findById(id, {}, { autopopulate: false });
    if (book) return book;

    throw new NotFoundException('Book not found');
  }

  async findByQueries(querys) {
    let {
      limit = 5,
      page = 1,
      orderField = '_id',
      order = 'CRESCENTE'
    } = querys;

    const mapOrdenation = {
      CRESCENTE: 1,
      DECRESCENTE: -1
    };

    limit = parseInt(limit);
    page = parseInt(page);

    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ [orderField]: mapOrdenation[order] })
      .skip(skip)
      .limit(limit);

    return books;
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
