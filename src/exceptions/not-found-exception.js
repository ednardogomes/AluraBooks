export class NotFoundException extends Error {
  name = 'NOT_FOUND_EXCEPTION';

  constructor(message = 'Not found', code = 404) {
    super(message);

    this.status = code;
  }

  send(response) {
    return response.status(this.status).json({
      error: this.name,
      message: this.message
    });
  }
}
