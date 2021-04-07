import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to return a list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      date: new Date(2021, 3, 7, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      date: new Date(2021, 3, 7, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: '123456',
      day: 7,
      month: 4,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
