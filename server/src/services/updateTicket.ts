import Tickets from '../interfaces/Ticket';
import ticketModel from '../models/TicketModel';

const updateTicket = async (id: string, updatedData: Tickets): Promise<Tickets | null> => {
  const result = await ticketModel.findByIdAndUpdate(id, updatedData, { new: true });

  return result;
};

export default updateTicket;
