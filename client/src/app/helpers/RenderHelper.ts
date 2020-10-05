import { defaultPhoto } from '../Config';
import Ticket from '../interfaces/Ticket';
import User from '../interfaces/User';

const progress: { [key: string]: string } = {
  backlog: '<i class="fas fa-clipboard-list" aria-hidden="true"></i>',
  selected: '<i class="fas fa-code" aria-hidden="true"></i>',
  'in-progress': '<i class="fas fa-spinner" aria-hidden="true"></i>',
  done: '<i class="fa fa-check-circle" aria-hidden="true"></i>',
};

export default class RenderHelper {
  public static generateBoardTicket(ticket: Ticket): string {
    const parsedDate = ticket.dueDate!.toString().slice(0, 10);

    let assigneeTemplate = '';

    if (ticket.assignee) {
      assigneeTemplate = `<div data-text="tooltip" class="card-assignee tooltip">
        <img class="photo" src="${ticket.assignee.photoUrl || defaultPhoto}"/>
        <span  class="tooltip-text">${ticket.assignee.name}</span></div>`;
    }

    return `<div class="card ${ticket.progress}" id="${ticket._id}" draggable="true">
                  <div class="card-title">${ticket.title}</div>
                  <div class="card-description">
                  <p><b>Description</b> ${ticket.description}</p>
                  <p><b>Estimated time</b>: ${ticket.estimatedTime} ${
      +ticket.estimatedTime! > 1 ? 'hours' : 'hour'
    }.</p>
                  </div>
                  <div class="ticket-bottom">
                    <div data-text="tooltip" class="tooltip">
                      ${parsedDate}
                      <span class="tooltip-text">Created at</span>
                    </div>
                    ${assigneeTemplate}
                  </div>
                </div>`;
  }

  public static generateBacklogTicket(ticket: Ticket): string {
    let assigneeTemplate = '';

    if (ticket.assignee) {
      assigneeTemplate = `<span class="task-date">Assignee: ${ticket.assignee.name || ''}</span>`;
    }

    return `<li class="task" id="${ticket._id}">
                  <div class="task-left">
                    <span class="check">${progress[ticket.progress!]}</i> </span>
                    <span class="priority"> 
                      <i class="fas fa-angle-double-up"></i>
                    </span>
                    <span class="number"></span>
                    <p class="text">${ticket.title}</p>
                  </div>
                  <div class="task-right"> 
                    ${assigneeTemplate}
                  </div>
                </li>`;
  }

  public static generateUser(user: User): string {
    return `<div class="user-photo">
      <img
        class="photo"
        src=${user.photoUrl || defaultPhoto}
        alt="Photo of users"
      />
    </div>`;
  }
}
