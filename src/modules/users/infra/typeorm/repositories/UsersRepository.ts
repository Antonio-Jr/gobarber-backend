import { getRepository, Not, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: { email },
    });
    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.repository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.repository.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(userData);
    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
