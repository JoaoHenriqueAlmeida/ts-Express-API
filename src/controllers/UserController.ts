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

export const createNewUser = async (req: Request, res: Response) => {
  const { username, classe, level, password } = req.body;

  const { httpStatus, message, data } = await UserServices
    .createNewUser({ username, classe, level, password });

  if (httpStatus >= StatusCodes.BadRequest) {
    return res.status(httpStatus).json({ message });
  }

  return res.status(StatusCodes.OK).json(data);
};
