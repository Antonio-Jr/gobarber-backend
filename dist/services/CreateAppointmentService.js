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
const date_fns_1 = require("date-fns");
const AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class CreateAppointmentService {
    execute({ provider_id, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
            const appointmentDate = date_fns_1.startOfHour(date);
            if (yield repository.findByDate(appointmentDate)) {
                throw new AppError_1.default('This appointment is already booked.');
            }
            const appointment = yield repository.create({
                provider_id,
                date: appointmentDate,
            });
            yield repository.save(appointment);
            return appointment;
        });
    }
}
exports.default = CreateAppointmentService;
