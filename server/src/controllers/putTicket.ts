import { updateTicket } from '../services';
import RequestTicketBody from '../interfaces/RequestTicketBody';

const putTicket = async (req: RequestTicketBody) => {
  const { body } = req;

  const { id } = req.params;

  const result = await updateTicket(id, body);
  return result;
};

export default putTicket;
