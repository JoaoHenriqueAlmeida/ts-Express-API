import { Router } from 'express';
import * as UserControllers from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/users', UserControllers.createNewUser);

userRouter.post('/login', UserControllers.userLogin);

export default userRouter;