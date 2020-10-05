import { Router, Request, Response } from 'express';

import routeControllers from '../controllers';
import QueryBody from '../interfaces/QueryBody';
import PaginatedData from '../interfaces/PaginatedData';

const ticketsRouter = Router();
ticketsRouter
  .route('/tickets')
  .get(async (req: Request<any, any, QueryBody, any>, res: Response<PaginatedData>) => {
    res.json(await routeControllers.getTickets(req));
  })
  .post(async (req: Request, res: Response) => {
    const newTicket = await routeControllers.postTicket(req);

    res.json(newTicket);
  });

ticketsRouter
  .route('/tickets/:id')
  .put(async (req: Request, res: Response) => {
    const updatedTicket = await routeControllers.putTicket(req);
    if (updatedTicket) {
      res.json(updatedTicket);
    } else {
      res.sendStatus(404);
    }
  })
  .delete(async (req: Request, res: Response) => {
    const isDeleted = await routeControllers.deleteTicket(req);
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  })
  .get(async (req: Request, res: Response) => {
    const ticket = await routeControllers.getTicket(req);

    if (ticket) {
      res.json(ticket);
    } else {
      res.sendStatus(404);
    }
  });

export default ticketsRouter;
