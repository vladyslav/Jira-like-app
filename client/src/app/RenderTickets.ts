import CssClass from './enums/CssClass';
import RenderHelper from './helpers/RenderHelper';
import Tickets from './interfaces/Ticket';



export default class RenderTickets {
  public renderTickets(tickets: Tickets[]): void {
    const rootDOMEl = document.querySelector('.backlog-tasks');

    let result = '';

    if (JSON.parse(localStorage.getItem('checked')!)) {
      this.renderBackLog(tickets);
    } else {
      result = this.renderBoard(tickets);
    }
    rootDOMEl!.innerHTML = result;
  }

  private renderBackLog(tickets: Tickets[]): void {
    let result = '';
    const columns: NodeListOf<HTMLElement> = document.querySelectorAll('.column');

    const columnElements: Map<string, HTMLElement> = new Map();

    columnElements
      .set(CssClass.backlog, document.getElementById(CssClass.backlog)!)
      .set(CssClass.selected, document.getElementById(CssClass.selected)!)
      .set(CssClass.inProgress, document.getElementById(CssClass.inProgress)!)
      .set(CssClass.done, document.getElementById(CssClass.done)!);

    columns.forEach((column: HTMLElement) => {
      while (column.firstChild) {
        column.removeChild(column.firstChild);
      }
    });

    tickets.forEach((ticket): void => {
      result = RenderHelper.generateBoardTicket(ticket);

      const targetColumn = columnElements.get(ticket.progress!);

      targetColumn!.innerHTML += result;
    });
  }

  private renderBoard(tickets: Tickets[]): string {
    let result = '';

    tickets.forEach((ticket): void => {

      result += RenderHelper.generateBacklogTicket(ticket);
    });

    return result;
  }
}
