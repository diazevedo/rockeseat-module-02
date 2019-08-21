import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'It is ok!' }));

export default routes;
