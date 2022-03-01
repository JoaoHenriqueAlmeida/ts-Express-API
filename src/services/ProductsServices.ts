import Joi from 'joi';
import * as utils from '../utils';
import IProduct from '../interfaces/IProduct';
import * as ProductsModels from '../models/ProductsModels';

const productPostSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().min(3).required().messages({
    'any.required': 'Amount is required',
    'string.base': 'Amount must be a string',
    'string.min': 'Amount must be longer than 2 characters',
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

    return utils.resGenerator(utils.StatusCodes.CREATED, '', createdProduct);
  } catch (e:any) {
    return utils.resGenerator(utils.StatusCodes.SERVER_ERROR, e.message);
  }
};

export const getAllProducts = async () => {
  try {
    const productsList = await ProductsModels.getAllProducts();

    return utils.resGenerator(utils.StatusCodes.OK, '', productsList);
  } catch (e:any) {
    return utils.resGenerator(utils.StatusCodes.SERVER_ERROR, e.message);
  }
};