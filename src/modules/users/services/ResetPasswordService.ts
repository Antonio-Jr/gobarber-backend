import { inject, injectable } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/hashProvider/interfaces/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);
    this.usersRepository.save(user);
  }
}
