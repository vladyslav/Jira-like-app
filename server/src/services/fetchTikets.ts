import ticketModel from '../models/TicketModel';
import QueryBody from '../interfaces/QueryBody';
import PaginatedData from '../interfaces/PaginatedData';

const fetchTickets = async (queryParams: QueryBody): Promise<PaginatedData> => {
  const searchRegExp = new RegExp(queryParams.search, 'i');

  const sortParams = queryParams.sort || 'dueDate';

  const totalCount = await ticketModel
    .find()
    .or([{ title: searchRegExp }, { description: searchRegExp }])
    .sort(sortParams)
    .countDocuments();

  const page = parseInt(queryParams.page, 10) || 1;

  const perPage = parseInt(queryParams.perPage, 10) || totalCount;

  const skip = (page - 1) * perPage;

  const data = await ticketModel
    .find()
    .populate(['assignee', 'creator'])
    .or([{ title: searchRegExp }, { description: searchRegExp }])
    .sort(sortParams)
    .limit(perPage)
    .skip(skip);

  return {
    page,
    perPage,
    totalCount,
    data,
  };
};

export default fetchTickets;
