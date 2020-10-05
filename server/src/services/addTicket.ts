import Tickets from '../interfaces/Ticket';
import ticketModel from '../models/TicketModel';

const addTicket = async (body: Tickets): Promise<Tickets> => {
  const newTicket = await ticketModel.create(body);

  return newTicket;
};

export default addTicket;
