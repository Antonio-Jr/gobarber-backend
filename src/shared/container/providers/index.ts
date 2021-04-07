import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/storageProviders/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/mailProvider/interfaces/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/mailProvider/implementations/EtherealMailProvider';
import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/interfaces/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
