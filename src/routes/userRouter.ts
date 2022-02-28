import { Router } from 'express';
import * as UserControllers from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/users', UserControllers.createNewUser);

export default userRouter;