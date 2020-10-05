import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import v1 from './router';
import connectDB from './config/db';
import authRoute from './router/auth';

dotenv.config({ path: `${__dirname}/.env` });

const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(v1);

app.listen(process.env.PORT, (): void => {
  // eslint-disable-next-line no-console
  console.log('App running');
});
