export class UnauthorizedException extends Error {
  name = 'UNAUTHORIZED_EXCEPTION';

  constructor(message = 'Unauthorized', code = 401) {
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
