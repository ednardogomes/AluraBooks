import authorService from './author-service.js';

class AuthorController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const author = await authorService.create(data);

      res.json(author);
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const authors = await authorService.find();

      res.json(authors);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorService.findOne(id);

      res.json(author);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const author = await authorService.update(id, data);
      res.json(author);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const message = await authorService.delete(id);

      res.json({ message });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorController();
