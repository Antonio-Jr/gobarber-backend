import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({ name, email, password });

      user.password = '';

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    user.password = '';

    return response.json(user);
  }
}
