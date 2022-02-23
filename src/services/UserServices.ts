import Joi from 'joi';
import responseGenerator from '../utils/responseGenerator';
import { IUser } from '../interfaces/IUser';
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
    return responseGenerator(400, JSON.stringify(validationError.error));
  }
  const newUser = {
    username,
    classe,
    level,
    password,
  };
  const createdNewUser = UserModels.createNewUser(newUser);
  return responseGenerator(200, '', createdNewUser);
};
