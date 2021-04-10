import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: process.env.CACHE_DRIVER as string | 'redis',
  config: {
    redis: {
      host: process.env.CACHE_HOST,
      port: process.env.CACHE_PORT,
      password: process.env.CACHE_PASSWORD,
    },
  },
} as ICacheConfig;
