import { Request } from 'express';

import { deleteTicketByID } from '../services';

const deleteTicket = (req: Request) => {
  const { id } = req.params;

  const result = deleteTicketByID(id);
  return result;
};

export default deleteTicket;
