import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
}

export const groselha = '';

export const createNewUser = async (req: Request, res: Response) => {
  const { username, classe, level, password } = req.body;

  const { status, message, data } = await UserServices
    .createNewUser({ username, classe, level, password });

  if (status >= StatusCodes.BadRequest) {
    return res.status(status).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};
