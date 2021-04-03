export default class Error {
  public readonly messsage: string;

  public readonly statusCode: number;

  public readonly teste: string;

  constructor(message: string, statusCode = 400) {
    this.teste = 'entrou aqui';
    this.messsage = message;
    this.statusCode = statusCode;
  }
}
