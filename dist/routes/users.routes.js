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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const uploadConfig_1 = __importDefault(require("../config/uploadConfig"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const UpdateUserAvatarService_1 = __importDefault(require("../services/UpdateUserAvatarService"));
const ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
const usersRouter = express_1.Router();
const upload = multer_1.default(uploadConfig_1.default);
usersRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService_1.default();
        const user = yield createUser.execute({ name, email, password });
        user.password = '';
        return response.json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
}));
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserAvatarService = new UpdateUserAvatarService_1.default();
    const user = yield updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
    });
    user.password = '';
    return response.json(user);
}));
exports.default = usersRouter;
