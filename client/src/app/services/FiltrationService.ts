import TicketService from './TicketService';

import Ticket from '../interfaces/Ticket';
import { defaultQueryParams } from '../Config';

export default class FiltrationService {
  public tickets: Ticket[] | undefined;

  public constructor(private ticketService: TicketService) {
    this.initService();
  }

  public async initService() {
    this.tickets = (await this.ticketService.getTickets()).data;
  }

  public async sortBy(sortParam: string, ascending: boolean): Promise<void> {
    const order = ascending ? '' : '-';

    const query = { ...defaultQueryParams, sort: order + sortParam };

    this.tickets = (await this.ticketService.getTickets(query)).data;
  }
}
