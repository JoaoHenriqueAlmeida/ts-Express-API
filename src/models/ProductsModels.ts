import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IProduct from '../interfaces/IProduct';

export const createNewProduct = async ({ name, amount }:IProduct) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  const { insertId: id } = result;

  const insertedProduct = { item: { id, name, amount } };

  return insertedProduct;
};

export const groselinha = '';