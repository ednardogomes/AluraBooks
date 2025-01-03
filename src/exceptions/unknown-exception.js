export class UnknownException extends Error {
  name = 'UNKNOWN_EXCEPTION';

  constructor(message = 'Unknown Error', code = 500) {
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
