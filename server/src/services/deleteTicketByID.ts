import Tickets from '../interfaces/Ticket';
import ticketModel from '../models/TicketModel';

const deleteTicketByID = async (id: string): Promise<Tickets | null> => {
  const isDeleted = ticketModel.findByIdAndDelete(id);

  return isDeleted;
};

export default deleteTicketByID;
