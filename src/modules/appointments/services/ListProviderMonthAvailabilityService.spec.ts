import 'reflect-metadata';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to return a list of the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 2, 7, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      user_id: '123',
      date: new Date(2021, 3, 7, 19, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '123456',
      year: 2021,
      month: 3,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 6, available: true },
        { day: 7, available: false },
        { day: 8, available: true },
        { day: 10, available: true },
      ]),
    );
  });
});
