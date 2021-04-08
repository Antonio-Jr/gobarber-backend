import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 8, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 3, 8, 13),
      provider_id: '123456123456',
      user_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456123456');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 4, 4, 14);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123456123456',
      user_id: '123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123456123456',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 8, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 3, 8, 11),
        provider_id: '123456123456',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const appointmentDate = new Date(2021, 3, 8, 14);

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123456123456',
        user_id: '123456123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 8, 14).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 3, 9, 7),
        provider_id: '123456123456',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 3, 9, 18),
        provider_id: '123456123456',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
