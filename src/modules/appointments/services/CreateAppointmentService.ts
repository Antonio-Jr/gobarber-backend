import { startOfHour, isBefore, getHours } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment in a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment to yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    if (await this.repository.findByDate(appointmentDate)) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.repository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
