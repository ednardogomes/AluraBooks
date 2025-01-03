import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { isValidObjectId } from 'mongoose';
import bookRepository from './book-repository.js';
import authorService from '../author/author-service.js';

class BookService {
  async create(data) {
    const { title, publisher, price, page, author } = data;
    if (!title) throw new BadRequestException('Título é obrigatório');

    if (!publisher) throw new BadRequestException('Editora é obrigatória');

    if (!price) throw new BadRequestException('Preço é obrigatório');

    if (!page)
      throw new BadRequestException('Quantidade de páginas é obrigatória');

    if (!author) throw new BadRequestException('ID do autor é obrigatório');
    await authorService.findOne(author);

    return bookRepository.create(data);
  }

  async find() {
    return await bookRepository.find();
  }

  async findOne(id) {
    if (!id || !isValidObjectId(id)) {
      throw new BadRequestException('ID vazio ou inválido');
    }

    return await bookRepository.findOne(id);
  }

  async update(id, data) {
    const { title, publisher, price, page, author } = data;
    if (!id || !isValidObjectId(id)) {
      throw new BadRequestException('ID vazio ou inválido');
    }

    if (!title) throw new BadRequestException('Título é obrigatório');

    if (!publisher) throw new BadRequestException('Editora é obrigatória');

    if (!price) throw new BadRequestException('Preço é obrigatório');

    if (!page)
      throw new BadRequestException('Quantidade de páginas é obrigatória');

    if (!author) throw new BadRequestException('Autor é obrigatório');

    return await bookRepository.update(id, data);
  }

  async delete(id) {
    if (!id || !isValidObjectId(id)) {
      throw new BadRequestException('ID vazio ou inválido');
    }

    return await bookRepository.delete(id);
  }
}

export default new BookService();
