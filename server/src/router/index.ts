import { Router } from 'express';

import usersRouter from './usersRouter';
import ticketsRouter from './ticketsRouter';

const v1 = Router();

v1.use('/api/v1', usersRouter);
v1.use('/api/v1', ticketsRouter);

export default v1;
