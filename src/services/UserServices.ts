import Joi from 'joi';
import jwt from 'jsonwebtoken';
import * as utils from '../utils';
import { IUser } from '../interfaces/IUser';
import * as UserModels from '../models/UserModels';
import ILogin from '../interfaces/ILogin';

// Dica do colega Leonardo 'eli' para gerar as mensagens customizadas do Joi

const userPostSchema = Joi.object({
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

const userLoginSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
}).strict();

export const createNewUser = async ({ username, classe, level, password }:IUser) => {
  try {
    const { error } = userPostSchema.validate({ username, classe, level, password });
    if (error) {
      const { message, type } = error.details[0];
      return utils.resGenerator(utils.handleErrorType(type), message);
    }

    const existingUser = await UserModels.findByUserName(username);

    if (existingUser) {
      return utils.resGenerator(utils.StatusCodes.CONFLICT, 'User already existis');
    }
    const createdNewUser = await UserModels.createNewUser({ username, classe, level, password });
    const token = jwt.sign({ data: createdNewUser }, 'secret');
    const { id } = createdNewUser;
    return utils.resGenerator(utils.StatusCodes.CREATED, '', { id, username, token });
  } catch (e:any) {
    return utils.resGenerator(utils.StatusCodes.SERVER_ERROR, e.message);
  }
};

export const userLogin = async ({ username, password }:ILogin) => {
  try {
    const { error } = userLoginSchema.validate({ username, password });
    if (error) {
      const { message, type } = error.details[0];
      return utils.resGenerator(utils.handleErrorType(type), message);
    }
  
    const authorizedUser = await UserModels.userLogin({ username, password });
    if (!authorizedUser.length) {
      return utils.resGenerator(utils.StatusCodes.UNAUTHORIZED, 'Username or password invalid');
    }
  
    const token = jwt.sign({ 
      id: authorizedUser[0].id, username: authorizedUser[0].username,
    }, 'secret');
  
    return utils.resGenerator(utils.StatusCodes.OK, '', token);
  } catch (e:any) {
    return utils.resGenerator(utils.StatusCodes.SERVER_ERROR, e.message);
  }
};
