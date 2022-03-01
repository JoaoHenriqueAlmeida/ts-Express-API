import { Request, Response } from 'express';
import * as ProductsServices from '../services/ProductsServices';

export const createNewProduct = async (req: Request, res: Response) => {
  const { name, amount } = req.body;

  const { status, message, data } = await ProductsServices.createNewProduct({ name, amount });

  if (status >= 400) {
    return res.status(status).json({ error: message });
  }

  return res.status(status).json(data);
};

export const groselha = '';