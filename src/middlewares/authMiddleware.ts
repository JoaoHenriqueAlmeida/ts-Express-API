import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from '../utils';
import * as UserModels from '../models/UserModels';

const getJWTUserById = async (decodedJWT: string | jwt.JwtPayload) => {
  if (typeof decodedJWT === 'object') {
    const user = await UserModels.findById(Number(decodedJWT.id));
    return Object.keys(user);
  }
  return false;
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });
    }

    const decodedJWT = jwt.verify(authorization, 'secret');

    const user = await getJWTUserById(decodedJWT);
    
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
}; 

export default authMiddleware;