import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

export const groselha = '';

export const createNewUser = async (req: Request, res: Response) => {
  const { username, classe, level, password } = req.body;

  const { status, message, data } = await UserServices
    .createNewUser({ username, classe, level, password });

  if (status >= 400) {
    return res.status(status).json({ message });
  }

  return res.status(status).json(data);
};
