import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

const date = new Date();
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date,
      provider_id: '123456123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456123456');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 4, 4, 14);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123456123456',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123456123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
