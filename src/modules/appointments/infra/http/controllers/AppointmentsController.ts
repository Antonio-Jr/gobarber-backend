import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listAppointments = container.resolve(ListAppointmentsService);
    const appointments = listAppointments.findAll();

    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      user_id,
      provider_id,
    });

    return response.json(appointment);
  }
}
