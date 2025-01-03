export class BadRequestException extends Error {
  name = 'BAD_REQUEST_EXCEPTION';

  constructor(message = 'Bad Request', code = 400) {
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
