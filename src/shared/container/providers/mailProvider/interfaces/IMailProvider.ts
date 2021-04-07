import ISendMailDTO from '@shared/container/providers/mailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
