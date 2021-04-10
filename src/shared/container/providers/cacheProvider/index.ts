import { container } from 'tsyringe';
import cacheConfig from '@config/Cache';
import ICacheProvider from '@shared/container/providers/cacheProvider/interfaces/ICacheProvider';
import RedisCacheProvider from '@shared/container/providers/cacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers[cacheConfig.driver],
);
