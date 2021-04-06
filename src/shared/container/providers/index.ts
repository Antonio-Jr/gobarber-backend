import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/storageProviders/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/mailProvider/interfaces/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailProvider>('MailProvider', '');
