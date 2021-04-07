import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const profile: IUserResponse = await showProfile.execute({
      user_id,
    });
    delete profile.password;
    return response.json(profile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, oldPassword, password } = request.body;
    const updateProfileService = container.resolve(UpdateProfileService);

    const user: IUserResponse = await updateProfileService.execute({
      user_id,
      name,
      email,
      oldPassword,
      password,
    });

    delete user.password;
    return response.json(user);
  }
}
