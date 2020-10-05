import User from '../interfaces/User';

import userModel from '../models/UserModel';

const getUserById = async (id: string): Promise<User | null> => {
  const user = userModel.findById(id);

  return user;
};

export default getUserById;
