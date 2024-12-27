import { autorModel } from '../../models/Autor.schema.js';
// import livroModel from '../../models/Livro.schema.js';

class AutorRepository {
  async find() {
    return await autorModel.find();
  }

  async findById(id) {
    return await autorModel.findById(id);
  }

  async addNewautor(data) {
    // const bookId = await livroModel.findById(data.book);
    // console.log(bookId);
    const newautor = await autorModel.create(data);
    return newautor;
  }

  async updateautor(id, data) {
    const updateautor = await autorModel.findByIdAndUpdate(id, data);
    return updateautor;
  }

  async deleteautor(id) {
    const deleteautor = await autorModel.findByIdAndDelete(id);
    return deleteautor;
  }
}

export default new AutorRepository();
