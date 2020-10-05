import User from '../interfaces/User';

import userModel from '../models/UserModel';

const fetchUsers = async (): Promise<User[]> => {
  const users = await userModel.find();
  return users;
};

export default fetchUsers;
