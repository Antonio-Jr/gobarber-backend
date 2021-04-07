import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/mailProvider/interfaces/IMailProvider';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
