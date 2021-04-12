import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      old_password: Joi.string().optional(),
      password: Joi.string().when('old_password', {
        is: Joi.object().exist(),
        then: Joi.string().required().min(6),
        otherwise: Joi.string().optional(),
      }),
      password_confirmation: Joi.string().when('old_password', {
        is: Joi.object().exist(),
        then: Joi.string().valid(Joi.ref('password')),
        otherwise: Joi.string().optional(),
      }),
    },
  }),
  profileController.update,
);

export default profileRouter;
