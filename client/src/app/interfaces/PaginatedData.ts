import Ticket from './Ticket';

export default interface PaginatedData {
  page: number;
  perPage: number;
  totalCount: number;
  data: Ticket[];
}
