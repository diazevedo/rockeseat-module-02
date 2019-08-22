import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import checkTokenMD from './app/middlewares/jwt';

const routes = new Router();

routes.get('/', UserController.show);
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.put('/users', checkTokenMD, UserController.update);

export default routes;
