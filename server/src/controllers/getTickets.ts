import { fetchTickets } from '../services';
import QueryRequest from '../interfaces/QueryRequest';
import PaginatedData from '../interfaces/PaginatedData';

const getTickets = async (req: QueryRequest): Promise<PaginatedData> => {
  const { query } = req;

  const result = await fetchTickets(query);

  return result;
};

export default getTickets;
