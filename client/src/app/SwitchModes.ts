import { defaultQueryParams } from './Config';
import Initialize from './interfaces/Initialize';
import RenderTickets from './RenderTickets';
import TicketService from './services/TicketService';

export default class SwitchModes implements Initialize {
  storage: void;

  checkbox: HTMLInputElement | null;

  backlog: HTMLElement | null;

  dragAndDrop: HTMLElement | null;

  state: string | null;

  constructor(private ticketService: TicketService, private renderTickets: RenderTickets) {
    this.checkbox = document.querySelector('.toggle-state');
    this.backlog = document.querySelector('.backlog-section');
    this.dragAndDrop = document.querySelector('.drag-and-drop');
    this.state = localStorage.getItem('checked');

    this.checkbox!.addEventListener('click', (): void => {
      this.toggleModes();
      this.setState(this.checkbox!.checked);
    });
  }

  private async toggleModes(): Promise<void> {
    if (this.state === 'true') {
      this.backlog!.classList.toggle('hide');
      this.dragAndDrop!.classList.toggle('hide');
      this.renderTickets.renderTickets(
        (await this.ticketService.getTickets(defaultQueryParams)).data,
      );
    } else {
      this.dragAndDrop!.classList.toggle('hide');
      this.backlog!.classList.toggle('hide');
      this.renderTickets.renderTickets(
        (await this.ticketService.getTickets(defaultQueryParams)).data,
      );
    }
  }

  private setState(state: boolean) {
    this.storage = localStorage.setItem('checked', (state as unknown) as string);
  }

  initialize(): void {
    if (this.state === 'true') {
      this.checkbox!.checked = true;
      this.toggleModes();
    }
  }
}
