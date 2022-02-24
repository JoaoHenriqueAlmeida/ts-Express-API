import Joi from 'joi';
import responseGenerator from '../utils/responseGenerator';
import { IUser } from '../interfaces/IUser';
import * as UserModels from '../models/UserModels';

export const userPostSchema = Joi.object({
  username: Joi.string().required().min(3),
  classe: Joi.string().required().min(3),
  level: Joi.number().required().greater(0),
  password: Joi.string().required().min(8),
}).strict();

export const createNewUser = async ({ username, classe, level, password }:IUser) => {
  const { error } = userPostSchema.validate({ username, classe, level, password });
  if (error) {
    console.log(error);
    return responseGenerator(422, error.details[0].message);
  }

  const newUser = {
    username,
    classe,
    level,
    password,
  };
  const createdNewUser = UserModels.createNewUser(newUser);
  return responseGenerator(201, '', createdNewUser);
};
