import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

const fakeUserRepository = new FakeUserRepository();
const fakeHashProvider = new FakeHashProvider();

describe('Create user', () => {
  it('should be able to create a new user', async () => {
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Antonio',
      email: 'antonio.jr.souza@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to create two users with the same email data with another user', async () => {
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      createUserService.execute({
        name: 'Junior',
        email: 'antonio.jr.souza@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
