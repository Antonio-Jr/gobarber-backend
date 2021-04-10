import { container } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/interfaces/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
