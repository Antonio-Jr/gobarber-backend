import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/storageProviders/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
