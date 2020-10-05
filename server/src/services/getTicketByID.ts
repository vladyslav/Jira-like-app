import Tickets from '../interfaces/Ticket';
import ticketModel from '../models/TicketModel';

const getTicketByID = async (id: string): Promise<Tickets | null> => {
  const ticket = ticketModel.findById(id);

  return ticket;
};

export default getTicketByID;
