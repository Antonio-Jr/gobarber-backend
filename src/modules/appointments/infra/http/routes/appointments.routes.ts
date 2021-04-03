import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthentication);
appointmentsRouter.get('/', appointmentsController.list);
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
