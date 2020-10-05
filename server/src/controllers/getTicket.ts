import { Request } from 'express';

import { getTicketByID } from '../services';

const getTicket = async (req: Request) => {
  const { id } = req.params;

  const result = getTicketByID(id);
  return result;
};

export default getTicket;
