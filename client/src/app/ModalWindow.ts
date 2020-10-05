import { defaultQueryParams } from './Config';
import DOMHelper from './helpers/DOMHelper';
import Initialize from './interfaces/Initialize';
import RenderTickets from './RenderTickets';
import TicketService from './services/TicketService';

export default class ModalWindow implements Initialize {
  private modalForm: HTMLFormElement | null;

  private modalDiv: HTMLElement | null;

  private overlay: HTMLElement | null;

  private createIssueButtons: NodeListOf<HTMLButtonElement>;

  private createTicketButton: HTMLButtonElement | null;

  private updateTicketButton: HTMLButtonElement | null;

  private deleteTicketButton: HTMLButtonElement | null;

  private taskTitle: HTMLInputElement;

  private description: HTMLInputElement;

  private dueDate: HTMLInputElement;

  private estimatedTime: HTMLInputElement;

  private assignee: HTMLSelectElement;

  private item: HTMLElement | undefined;

  constructor(private ticketService: TicketService, private renderTickets: RenderTickets) {
    this.modalForm = document.getElementById('modal-form') as HTMLFormElement;
    this.modalDiv = document.getElementById('modal');
    this.overlay = document.getElementById('overlay');

    this.createIssueButtons = document.querySelectorAll('.btn-create-issue');
    this.createTicketButton = document.getElementById('createTicket') as HTMLButtonElement;
    this.updateTicketButton = document.getElementById('updateTicket') as HTMLButtonElement;
    this.deleteTicketButton = document.getElementById('deleteTicket') as HTMLButtonElement;

    this.taskTitle = document.getElementById('taskTitle') as HTMLInputElement;
    this.description = document.getElementById('description') as HTMLInputElement;
    this.dueDate = document.getElementById('dueDate') as HTMLInputElement;
    this.estimatedTime = document.getElementById('estimatedTime') as HTMLInputElement;
    this.assignee = document.getElementById('assignee') as HTMLSelectElement;
  }

  public initialize(): void {
    this.addEventListeners('.column', 'card');
    this.addEventListeners('.backlog-tasks', 'task');
    this.initSubscriptions();
  }

  private addEventListeners(blockClassName: string, elementClassName: string) {
    document.querySelectorAll(blockClassName).forEach((item) => {
      item.addEventListener('click', async (event: Event) => {
        this.item = DOMHelper.getParentElement(event.target as HTMLElement, elementClassName);
        if (this.item) { 
        this.createTicketButton!.classList.add('hide');
        this.updateTicketButton!.classList.remove('hide');
        this.deleteTicketButton!.classList.remove('hide');
        this.toggleModal();

        const ticketData = await this.getTicketData(this.item.id);
        this.taskTitle!.value = ticketData!.title || '';
        this.description!.value = ticketData!.description || '';
        this.dueDate!.value = ticketData!.dueDate!.toString().slice(0, 10) || '';
        this.estimatedTime!.value = ticketData!.estimatedTime!.toString() || '';
        (this.assignee! as any).value = ticketData!.assignee || '';
      }
      });
    });
  }

  private initSubscriptions() {
    this.createIssueButtons!.forEach((button) => {
      button.addEventListener('click', () => {
        this.createTicketButton!.classList.remove('hide');
        this.updateTicketButton!.classList.add('hide');
        this.deleteTicketButton!.classList.add('hide');
        this.toggleModal();
      });
    });

    this.createTicketButton!.addEventListener('click', (event: Event) => {
      this.handleForm(this.createNewTicket.bind(this), event);
    });

    this.updateTicketButton!.addEventListener('click', (event: Event) => {
      this.handleForm(this.updateTicket.bind(this), event, this.item!.id);
    });

    this.deleteTicketButton!.addEventListener('click', (event: Event) => {
      this.handleForm(this.deleteTicket.bind(this), event, this.item!.id);
    });

    this.overlay!.addEventListener('click', () => {
      this.toggleModal();
      this.clearInput();
    });
  }

  private async handleForm(action: any, event: Event, id?: string) {
    event.preventDefault();
    if (this.modalForm!.checkValidity()) {
      this.toggleModal();
      action(id);
      this.renderTickets.renderTickets(
        (await this.ticketService.getTickets(defaultQueryParams)).data,
      );
    } else {
      this.modalForm!.reportValidity();
    }
  }

  private toggleModal(): void {
    this.modalDiv!.classList.toggle('active');
    this.overlay!.classList.toggle('active');
  }

  private clearInput(): void {
    this.taskTitle!.value = '';
    this.description!.value = '';
    this.dueDate!.value = '';
    this.estimatedTime!.value = '';
  }

  private getModalData(elements: HTMLFormControlsCollection) {
    return [].reduce.call(
      elements,
      (data: any, element: HTMLInputElement) => {
        if (element.name && element.value) {
          // eslint-disable-next-line no-param-reassign
          data[element.name] = element.value;
        }
        return data;
      },
      {},
    );
  }

  private getNewTicketData(elements: HTMLFormControlsCollection) {
    const data = this.getModalData(elements) as any;
    return { ...data, progress: 'backlog', createdAt: Date.now() };
  }

  private async getTicketData(id: string) {
    const ticketData = await this.ticketService.getTicket(id);
    return ticketData;
  }

  private createNewTicket(): void {
    const data = this.getNewTicketData(this.modalForm!.elements);
    this.ticketService.postTicket(data);
    this.clearInput();
  }

  private async updateTicket(id: string): Promise<void> {
    const data = this.getModalData(this.modalForm!.elements);
    await this.ticketService.updateTicket(id, data);
    this.clearInput();
  }

  private async deleteTicket(id: string): Promise<void> {
    await this.ticketService.deleteTicket(id);
  }
}
