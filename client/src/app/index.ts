import Login from './Login';
import Search from './Search';
import RenderUsers from './RenderUsers';
import ModalWindow from './ModalWindow';
import SwitchModes from './SwitchModes';
import RenderTickets from './RenderTickets';
import ChangeStyle from './ClassChangeStyle';
import FiltrationView from './FiltrationView';
import ClientPagination from './ClassClientPagination';

import User from './interfaces/User';
import Tickets from './interfaces/Ticket';
import UserService from './services/UserService';
import Initialize from './interfaces/Initialize';
import TicketService from './services/TicketService';
import FiltrationService from './services/FiltrationService';
import ChangeStyleTheme from './ClassChangeStyleTheme';
import { defaultQueryParams } from './Config';

const getDataFromServer = async (): Promise<{ tickets: Tickets[]; users: User[] }> => {
  const ticketService = new TicketService();

  const userService = new UserService();

  const users = await userService.getUsers();

  const data = await ticketService.getTickets(defaultQueryParams);

  return { tickets: data.data, users };
};

const initialRender = (users: User[], tickets: Tickets[]) => {
  const ticketService = new TicketService();
  const viewInstances: Initialize[] = [
    new ChangeStyleTheme(),
    new ChangeStyle(ticketService),
    new ModalWindow(ticketService, new RenderTickets()),
    new Login(),
    new SwitchModes(ticketService, new RenderTickets()),
    new FiltrationView(new FiltrationService(ticketService), new RenderTickets()),
    new Search(new RenderTickets(), ticketService),
    new ClientPagination(ticketService),
  ];

  viewInstances.forEach((instance: Initialize) => {
    instance.initialize();
  });

  (() => new RenderUsers(users, 'filtration-creator'))();

  const render = new RenderTickets();

  document.querySelector('.toggle-state')!.addEventListener('change', () => {
    render.renderTickets(tickets);
  });
};

const initialize = async () => {
  const { users, tickets } = await getDataFromServer();
  initialRender(users, tickets);
};

initialize();
