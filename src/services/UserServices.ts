import Joi from 'joi';
import responseGenerator from '../utils/responseGenerator';
import IUser from './IUser';
import * as UserModels from '../models/UserModels';

export const userPostSchema = Joi.object({
  username: Joi.string().required(),
  classe: Joi.string().required(),
  level: Joi.number().required(),
  password: Joi.string().required(),
});

export const createNewUser = async ({ username, classe, level, password }:IUser) => {
  const validationError = userPostSchema.validate({ username, classe, level, password });
  if (validationError) {
    return responseGenerator(400, validationError.error.details[0]);
  }
  const newUser = await UserModels.createNewUser({ username, classe, level, password });
  return responseGenerator(200, '', newUser);
};
