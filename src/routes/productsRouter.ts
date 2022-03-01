import { Router } from 'express';
import * as ProductsController from '../controllers/ProductsController';
import authMiddleware from '../middlewares/authMiddleware';

const productsRouter = Router();

productsRouter.post('/products', authMiddleware, ProductsController.createNewProduct);

productsRouter.get('/products', authMiddleware, ProductsController.getAllProducts);

export default productsRouter;