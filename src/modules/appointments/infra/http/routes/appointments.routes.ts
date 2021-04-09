import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthentication);
appointmentsRouter.get('/', appointmentsController.list);
appointmentsRouter.get('/me', providerAppointmentsController.list);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
