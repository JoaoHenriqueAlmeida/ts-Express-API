import express from 'express';
import userRouter from './routes/userRouter';
import productsRouter from './routes/productsRouter';

const app = express();

app.use(express.json());

app.use('/', userRouter);
app.use('/', productsRouter);

export default app;
