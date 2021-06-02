import { Router } from 'express';

import UsersController from '../controllers/UsersControllers';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

export default usersRouter;