import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', UserController.show);
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

export default routes;
