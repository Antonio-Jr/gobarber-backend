import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

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
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email adress already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
