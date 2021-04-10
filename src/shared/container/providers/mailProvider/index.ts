import { container } from 'tsyringe';
import IMailProvider from '@shared/container/providers/mailProvider/interfaces/IMailProvider';
import mailConfig from '@config/Mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
