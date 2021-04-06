import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointmentsService: ListAppointmentsService;

describe('ListAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAppointmentsService = new ListAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should return an empty array of appointments', async () => {
    await fakeAppointmentsRepository.clear();

    const appointments = await listAppointmentsService.findAll();
    expect(appointments).toHaveLength(0);
  });

  it('should return a filled array of appointments with two positions', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2021, 4, 5, 14),
      provider_id: '123456123456',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2021, 4, 6, 15),
      provider_id: '123456',
    });

    const appointments = await listAppointmentsService.findAll();
    expect(appointments).toHaveLength(2);
  });
});
