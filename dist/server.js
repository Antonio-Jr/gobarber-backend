"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const uploadConfig_1 = __importDefault(require("./config/uploadConfig"));
const AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(uploadConfig_1.default.directory));
app.use(routes_1.default);
app.use((error, request, response, _) => {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.messsage,
        });
    }
    console.error(error);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!');
});
