import express from 'express';

import * as UserControllers from './controllers/UserController';

const app = express();

app.use(express.json());

app.route('/users')
  .post(UserControllers.createNewUser);

export default app;
