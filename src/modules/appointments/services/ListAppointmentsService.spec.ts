import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

const fakeAppointmentsRepository = new FakeAppointmentsRepository();

describe('ListAppointments', () => {
  it('should return an empty array of appointments', async () => {
    await fakeAppointmentsRepository.clear();
    const listAppointmentsService = new ListAppointmentsService(
      fakeAppointmentsRepository,
    );
    const appointments = await listAppointmentsService.findAll();
    expect(appointments).toHaveLength(0);
  });

  it('should return a filled array of appointments with two positions', async () => {
    const listAppointmentsService = new ListAppointmentsService(
      fakeAppointmentsRepository,
    );
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointmentService.execute({
      date: new Date(2021, 4, 5, 14),
      provider_id: '123456123456',
    });

    await createAppointmentService.execute({
      date: new Date(2021, 4, 6, 15),
      provider_id: '123456',
    });

    const appointments = await listAppointmentsService.findAll();
    expect(appointments).toHaveLength(2);
  });
});
