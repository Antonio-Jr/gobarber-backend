import { container } from 'tsyringe';
import uploadConfig from '@config/UploadConfig';
import IStorageProvider from '@shared/container/providers/storageProviders/interfaces/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProviders/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/storageProviders/implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
