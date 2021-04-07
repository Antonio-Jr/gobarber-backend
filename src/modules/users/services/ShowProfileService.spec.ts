import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show an user profile with a correct id', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const queryUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(queryUser).toEqual(user);
  });

  it('should not be able to show an user profile from non existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
