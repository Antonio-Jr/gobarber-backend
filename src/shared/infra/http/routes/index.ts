import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();
routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
