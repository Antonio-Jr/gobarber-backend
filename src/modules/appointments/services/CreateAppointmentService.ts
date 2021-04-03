import { startOfHour } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (await this.repository.findByDate(appointmentDate)) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.repository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
