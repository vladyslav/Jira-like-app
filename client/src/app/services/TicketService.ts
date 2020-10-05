import { apiURL } from '../Config';
import Query from '../interfaces/Query';
import Ticket from '../interfaces/Ticket';
import PaginatedData from '../interfaces/PaginatedData';

export default class TicketService {
  private readonly ticketURL = `${apiURL}/tickets/`;

  public async getTickets(query?: Query): Promise<PaginatedData> {
    let queryParams = '?';

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        queryParams += `${key}=${value}&`;
      });
    }
    const request = await fetch(`${this.ticketURL}${queryParams}`);

    return request.json();
  }

  public async getTicket(id: string): Promise<Ticket | null> {
    const request = await fetch(`${this.ticketURL}${id}`);

    return request.json();
  }

  public async postTicket(ticket: Ticket): Promise<Ticket> {
    const request = await fetch(
      `${this.ticketURL}`,
      this.setOptions('post', ticket, {
        'Content-type': 'application/json; charset=UTF-8',
      }),
    );

    return request.json();
  }

  public async updateTicket(id: string, dataToUpdate: any):Promise<Ticket| null> {
    const request = await fetch(
      `${this.ticketURL}${id}`,
      this.setOptions('put', dataToUpdate, {
        'Content-type': 'application/json; charset=UTF-8',
      }),
    );

    return request.json();
  }

  public async deleteTicket(id: string): Promise<boolean> {
    const request = await fetch(`${this.ticketURL}${id}`, this.setOptions('delete'));

    if (request.status === 404) {
      return false;
    }

    return true;
  }

  private setOptions(method?: string, body?: object, headers?: object): object {
    const requestOptions: any = {};
    if (method) {
      requestOptions.method = method;
    }
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    if (headers) {
      requestOptions.headers = headers;
    }

    return requestOptions;
  }
}
