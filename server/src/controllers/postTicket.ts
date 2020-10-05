import { addTicket } from '../services';
import Tickets from '../interfaces/Ticket';
import RequestTicketBody from '../interfaces/RequestTicketBody';

const postTicket = async (req: RequestTicketBody): Promise<Tickets> => {
  const { body } = req;

  const result = await addTicket(body);

  return result;
};

export default postTicket;
