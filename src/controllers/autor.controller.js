import autorService from '../service/autor.service.js';

class AutorController {
  async find(req, res, next) {
    try {
      const autores = await autorService.find();
      res.status(200).send(autores);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const autor = await autorService.findById(id);
      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        res.status(404).send({ message: 'Id do autor não localizado.' });
      }
    } catch (error) {
      next(error);
    }
  }

  async addNewAutor(req, res, next) {
    try {
      await autorService.addNewautor(req.body);
      res.status(201).json('Autor criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async updateAutor(req, res, next) {
    try {
      await autorService.updateAutor(req.params.id, req.body);
      res.status(200).json('Autor atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async deleteAutor(req, res, next) {
    try {
      await autorService.deleteAutor(req.params.id);
      res.status(200).json('Autor deletado com sucesso');
    } catch (error) {
      next(error);
    }
  }
}

export default new AutorController();
