import { fetchUsers } from '../services';

const getUsers = async () => {
  const result = await fetchUsers();

  return result;
};

export default getUsers;
