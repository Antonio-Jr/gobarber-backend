import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private repository: IUserRepository,
  ) {}

  private async userAvatarExists(avatar: string): Promise<boolean> {
    const userAvatarFilePath = this.getAvatarFilePath(avatar);
    const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

    return !!userAvatarExists;
  }

  private getAvatarFilePath(avatar: string): string {
    return path.join(uploadConfig.directory, avatar);
  }

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user)
      throw new AppError(
        'Only authenticated users can change the avatar.',
        401,
      );

    if (user.avatar && (await this.userAvatarExists(user.avatar))) {
      const avatarFilePath = this.getAvatarFilePath(user.avatar);
      await fs.promises.unlink(avatarFilePath);
    }

    user.avatar = avatarFileName;
    await this.repository.save(user);

    return user;
  }
}
