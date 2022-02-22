import express from 'express';

const app = express();

app.use(express.json());

app.route('/users')
  .post();

export default app;
