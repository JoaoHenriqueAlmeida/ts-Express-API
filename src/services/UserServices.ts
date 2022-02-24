import Joi from 'joi';
import jwt from 'jsonwebtoken';
import responseGenerator from '../utils/responseGenerator';
import { IUser } from '../interfaces/IUser';
import * as UserModels from '../models/UserModels';
import StatusCodes from '../utils/StatusCodes';
import handleErrorType from '../utils/errorHandler';

// Dica do colega Leonardo 'eli' para gerar as mensagens customizadas do Joi

export const userPostSchema = Joi.object({
  username: Joi.string().required().min(3).messages({
    'any.required': 'Username is required',
    'string.base': 'Username must be a string',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().required().min(3).messages({
    'any.required': 'Classe is required',
    'string.base': 'Classe must be a string',
    'string.min': 'Classe must be longer than 2 characters',
  }),
  level: Joi.number().required().greater(0).messages({
    'any.required': 'Level is required',
    'number.base': 'Level must be a number',
    'number.greater': 'Level must be greater than 0',
  }),
  password: Joi.string().required().min(8).messages({
    'any.required': 'Password is required',
    'string.base': 'Password must be a string',
    'string.min': 'Password must be longer than 7 characters',
  }),
}).strict();

export const createNewUser = async ({ username, classe, level, password }:IUser) => {
  try {
    const { error } = userPostSchema.validate({ username, classe, level, password });
    if (error) {
      const { message, type } = error.details[0];
      console.log(error);
      return responseGenerator(handleErrorType(type), message);
    }

    const existingUser = await UserModels.findByUserName(username);

    if (existingUser) return responseGenerator(StatusCodes.CONFLICT, 'User already existis');
    const createdNewUser = await UserModels.createNewUser({ username, classe, level, password });
    const token = jwt.sign({ data: createdNewUser }, 'secret');
    const { id } = createdNewUser;
    return responseGenerator(StatusCodes.CREATED, '', { id, username, token });
  } catch (e:any) {
    return responseGenerator(StatusCodes.SERVER_ERROR, e.message);
  }
};
