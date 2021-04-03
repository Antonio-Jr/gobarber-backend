"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class CreateUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield typeorm_1.getRepository(User_1.default);
            const userExists = yield repository.findOne({
                where: { email },
            });
            if (userExists)
                throw new AppError_1.default('Email adress already exists');
            const hashedPassword = yield bcryptjs_1.hash(password, 8);
            const user = yield repository.create({
                name,
                email,
                password: hashedPassword,
            });
            yield repository.save(user);
            return user;
        });
    }
}
exports.default = CreateUserService;
