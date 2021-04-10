import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/cacheProvider/interfaces/ICacheProvider';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/hashProvider/interfaces/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private repository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email adress already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}
