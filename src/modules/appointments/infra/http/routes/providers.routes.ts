import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersMonthAvailabilityController from '../controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvailabilityController from '../controllers/ProvidersDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();

providersRouter.use(ensureAuthentication);
providersRouter.get('/', providersController.list);

providersRouter.get(
  '/:provider_id/month-availability',
  providersMonthAvailabilityController.list,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providersDayAvailabilityController.list,
);

export default providersRouter;
