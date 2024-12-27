import autorRepository from '../repositories/autor/autor.repository.js';

class AutorService {
  async find() {
    const autores = await autorRepository.find();
    return autores;
  }

  async findById(id) {
    const autorById = await autorRepository.findById(id);
    return autorById;
  }

  async addNewautor(data) {
    const newAutor = await autorRepository.addNewautor(data);
    return newAutor;
  }

  async updateAutor(id, data) {
    const updateAutor = await autorRepository.updateautor(id, data);
    return updateAutor;
  }

  async deleteAutor(id) {
    const deleteAutor = await autorRepository.deleteautor(id);
    return deleteAutor;
  }
}

export default new AutorService();
