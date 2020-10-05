import Ticket from './interfaces/Ticket';
import RenderTickets from './RenderTickets';
import Initialize from './interfaces/Initialize';
import TicketService from './services/TicketService';
import { defaultQueryParams } from './Config';

export default class Search implements Initialize {
  private renderTickets: RenderTickets;

  private searchBar: HTMLInputElement | null = null;

  private resultInputValue: string = '';

  private timeout: number = 0;

  public filteredData: Ticket[] = [];

  constructor(renderTickets: RenderTickets, private ticketService: TicketService) {
    this.renderTickets = renderTickets;
  }

  public initialize(): void {
    this.getInput();
    this.addListener();
  }

  private getInput(): void {
    this.searchBar = document.querySelector('.search-input');
  }

  private addListener(): void {
    this.searchBar!.addEventListener('keyup', (e: Event) => {
      e.preventDefault();
      this.resultInputValue = (e.target as HTMLInputElement).value.toLowerCase().trim();
      this.handleSearch();
    });
  }

  private handleSearch(): void {
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(async () => {
      const query = {
        ...defaultQueryParams,
        search: this.resultInputValue,
      };

      this.filteredData = (await this.ticketService.getTickets(query)).data;

      this.renderTickets.renderTickets(this.filteredData);
    }, 600);
  }
}
