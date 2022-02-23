import { ResultSetHeader } from 'mysql2';

import connection from './connection';

import { IUser, User } from '../interfaces/IUser';

export const createNewUser = async (user: IUser): Promise<IUser> => {
  const { username, classe, level, password } = user;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', 
    [username, classe, password, new Date(), new Date()],
  );
  const { insertId: id } = result;

  const insertedUser: User = { id, username, classe, level, password };

  return insertedUser;
};

export const groselinha = '';
