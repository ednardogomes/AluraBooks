import { autorModel } from '../../models/Autor.schema.js';
import livroModel from '../../models/Livro.schema.js';

class BookRepository {
  async find() {
    return await livroModel.find();
  }

  async findById(id) {
    return await livroModel.findById(id);
  }

  async addNewBook(data) {
    const idAuthor = await autorModel.findById(data.author);
    const completedBook = { ...data, author: { ...idAuthor._doc } };
    const newBook = await livroModel.create(completedBook);
    return newBook;
  }

  async updateBook(id, data) {
    const updateBook = await livroModel.findByIdAndUpdate(id, data);
    return updateBook;
  }

  async deleteBook(id) {
    const deleteBook = await livroModel.findByIdAndDelete(id);
    return deleteBook;
  }

  async booksByPublisher(data) {
    const bookForPublisher = await livroModel.find({ publisher: data });
    return bookForPublisher;
  }
}

export default new BookRepository();
