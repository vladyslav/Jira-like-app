import { Router, Request, Response } from 'express';
import login from '../controllers/login';
import register from '../controllers/register';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const user = await register(req);
  const token = await login(req);
  if (!user) {
    res.status(400).send('This email address has already been registered.');
  } else {
    await user!.save();
    res
      .cookie('COOKIE', token, { expires: new Date(Date.now() + 36000000) })
      .redirect('http://localhost:9000/');
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const token = await login(req);
  if (!token) {
    res.cookie('ERROR', 'error').redirect('http://localhost:9000/');
  } else {
    res
      .cookie('COOKIE', token, { expires: new Date(Date.now() + 36000000) })
      .redirect('http://localhost:9000/');
  }
});

export default router;
