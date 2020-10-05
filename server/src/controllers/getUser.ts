import { Request } from 'express';

import { getUserById } from '../services';

const getUser = async (req: Request) => {
  const { id } = req.params;

  const result = getUserById(id);
  return result;
};

export default getUser;
