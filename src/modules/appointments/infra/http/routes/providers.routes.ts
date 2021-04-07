import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthentication);
providersRouter.get('/', providersController.list);

export default providersRouter;
