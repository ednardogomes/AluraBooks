import { NotFoundException } from '../exceptions/not-found-exception.js';
import Author from './models/author.js';

class AuthorRepository {
  async create(data) {
    return await Author.create(data);
  }

  async find() {
    const authors = await Author.find();
    if (authors.length > 0) return authors;

    throw new NotFoundException('Nenhum registro encontrado');
  }

  async findOne(id) {
    const author = await Author.findById(id);
    if (author) return author;

    throw new NotFoundException('Author not found');
  }

  async update(id, data) {
    const author = await this.findOne(id);
    await Author.updateOne(
      {
        id
      },
      {
        $set: {
          name: data?.name ?? author.name,
          nationality: data?.nationality ?? author.nationality
        }
      }
    );

    return this.find(id);
  }

  async delete(id) {
    await this.findOne(id);
    await Author.deleteOne({ id });

    return 'Author deleted';
  }
}

export default new AuthorRepository();
