import CssClass from './enums/CssClass';
import DOMHelper from './helpers/DOMHelper';
import DragAndDrop from './ClassDragAndDrop';
import Initialize from './interfaces/Initialize';
import TicketService from './services/TicketService';

export default class ChangeStyle extends DragAndDrop implements Initialize {
  private stylesCaseHandlers: Map<string, Function>;

  constructor(private ticketService: TicketService) {
    super();
    this.stylesCaseHandlers = new Map();
  }

  public initialize(): void {
    super.initialize();
    this.addEvents();
  }

  private addEvents(): void {
    this.columns!.forEach((column: HTMLElement) => {
      column.addEventListener('drop', (event) => this.changeStyleCard(event));
    });
  }

  private async changeStyleCard(event: Event): Promise<void> {
    const currentColumn = DOMHelper.getParentElement(event.target as HTMLElement,'column');

    const allStyles = [CssClass.backlog, CssClass.selected, CssClass.inProgress, CssClass.done];

    this.stylesCaseHandlers
      .set('backlog', async () => {
        await this.ticketService.updateTicket(this.currentCard!.id, { progress: CssClass.backlog });
        this.currentCard!.classList.remove(...allStyles);
        this.currentCard!.classList.add(CssClass.backlog);
      })
      .set('selected', async () => {
        await this.ticketService.updateTicket(this.currentCard!.id, {
          progress: CssClass.selected,
        });
        this.currentCard!.classList.remove(...allStyles);
        this.currentCard!.classList.add(CssClass.selected);
      })
      .set('in-progress', async () => {
        await this.ticketService.updateTicket(this.currentCard!.id, {
          progress: CssClass.inProgress,
        });
        this.currentCard!.classList.remove(...allStyles);
        this.currentCard!.classList.add(CssClass.inProgress);
      })
      .set('done', async () => {
        await this.ticketService.updateTicket(this.currentCard!.id, { progress: CssClass.done });
        this.currentCard!.classList.remove(...allStyles);
        this.currentCard!.classList.add(CssClass.done);
      });

    const handlerStyles = this.stylesCaseHandlers.get(currentColumn!.id);

    if (handlerStyles) {
      await handlerStyles();
    }
  }
}
