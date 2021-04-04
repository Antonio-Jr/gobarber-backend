import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

const fakeUserRepository = new FakeUserRepository();
const fakeHashProvider = new FakeHashProvider();

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Antonio',
      email: 'antonio.jr.souza@gmail.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'antonio.jr.souza@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate an user with non existing user', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'antonio@souza.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with invalid password', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Antonio',
      email: 'antonio.jr@souza.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'antonio.jr@souza.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
