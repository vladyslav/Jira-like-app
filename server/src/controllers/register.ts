import { Request } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';

const register = async (req: Request) => {
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) {
    return undefined;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  return user;
};

export default register;
