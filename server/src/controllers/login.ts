import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';

const login = async (req: Request): Promise<string | undefined> => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return undefined;
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return undefined;
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!);
  return token;
};

export default login;
