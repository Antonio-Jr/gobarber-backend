"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(message, statusCode = 400) {
        this.teste = 'entrou aqui';
        this.messsage = message;
        this.statusCode = statusCode;
    }
}
exports.default = Error;
