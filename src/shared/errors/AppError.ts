export default class Error {
  public readonly messsage: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.messsage = message;
    this.statusCode = statusCode;
  }
}
