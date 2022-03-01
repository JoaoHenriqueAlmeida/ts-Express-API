import Joi from 'joi';
import jwt from 'jsonwebtoken';
import * as utils from '../utils';
import { IProduct } from '../interfaces/IProduct';
import * as ProductsModels from '../models/ProductsModels';

const productPostSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'Name is required',
  }),
  amount: Joi.string().min(3).required().messages({
    'any.required': 'Amount is required',
  }),
}).strict();

export const createNewProduct = async ({ name, amount }:IProduct) => {
  try {
    const { error } = productPostSchema.validate({ name, amount });
    if (error) {
      const { message, type } = error.details[0];
      return utils.resGenerator(utils.handleErrorType(type), message);
    }

    const createdProduct = await ProductsModels.createNewProduct({ name, amount });

    return utils.resGenerator(utils.StatusCodes.OK, '', createdProduct);
  } catch (e:any) {
    return utils.resGenerator(utils.StatusCodes.SERVER_ERROR, e.message);
  }
};

export const groselinha = '';