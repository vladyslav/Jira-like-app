import { Request } from 'express';

import Tickets from './Ticket';

export default interface RequestTicketBody extends Request {
  body: Tickets;
}
