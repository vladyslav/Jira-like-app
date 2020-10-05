import { Schema, model, Document } from 'mongoose';
import User from '../interfaces/User';

const userSchema = new Schema(
  {
    name: { type: String },
    photoUrl: { type: String },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
  },
  {
    versionKey: false,
  },
);

const UserModel = model<User & Document>('user', userSchema);
export default UserModel;
