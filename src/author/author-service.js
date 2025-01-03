import { BadRequestException } from '../exceptions/bad-request-exception.js';
import { isValidObjectId } from 'mongoose';
import authorRepository from './author-repository.js';

class AuthorService {
  async create(data) {
    const { name, nationality } = data;

    if (!name) {
      throw new BadRequestException('Nome do autor é obrigatório');
    }

    if (!nationality) {
      throw new BadRequestException('Nacionalidade do autor é obrigatório');
    }

    return authorRepository.create(data);
  }

  async find() {
    return await authorRepository.find();
  }

  async findOne(id) {
    if (!id || !isValidObjectId(id)) {
      throw new BadRequestException('ID vazio ou inválido');
    }

    return await authorRepository.findOne(id);
  }

  async update(id, data) {
    const { name, nationality } = data;

    if (!id || !isValidObjectId(id)) {
      throw new BadRequestException('ID vazio ou inválido');
    }

    if (!name || !nationality) {
      throw new BadRequestException(
        'Nome ou(e) nacionalidade do autor é(são) obrigatório(s)'
      );
    }

    return await authorRepository.update(id, data);
  }

  async delete(id) {
    if (!id || !isValidObjectId(id)) {
      throw new BadRequestException('ID vazio ou inválido');
    }

    return await authorRepository.delete(id);
  }
}

export default new AuthorService();
