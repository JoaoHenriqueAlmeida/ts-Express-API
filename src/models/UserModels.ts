import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';
import { IUser, User } from '../interfaces/IUser';

export const findByUserName = async (username: string): Promise<IUser | null> => {
  const [data] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM Trybesmith.Users WHERE username = ?',
    [username],
  );

  if (!data.length) return null;

  const [user] = data as IUser[];

  return user;
};

export const createNewUser = async ({ username, classe, level, password }: IUser) => {
  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const insertedUser: User = { id, username, classe, level, password };

  return insertedUser;
};
