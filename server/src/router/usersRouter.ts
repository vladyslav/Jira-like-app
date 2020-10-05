import { Router, Request, Response } from 'express';

import routeControllers from '../controllers';

const usersRouter = Router();

usersRouter.route('/users').get(async (_, res: Response) => {
  const users = await routeControllers.getUsers();

  if (users) {
    res.json(users);
  } else {
    res.sendStatus(404);
  }
});

usersRouter.route('/users/:id').get(async (req: Request, res: Response) => {
  const users = await routeControllers.getUser(req);

  if (users) {
    res.json(users);
  } else {
    res.sendStatus(404);
  }
});

export default usersRouter;
