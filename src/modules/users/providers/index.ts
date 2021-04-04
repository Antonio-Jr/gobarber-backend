import { container } from 'tsyringe';
import IHashProvider from '@modules/users/providers/hashProvider/interfaces/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/hashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
