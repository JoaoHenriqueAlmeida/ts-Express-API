import { Router } from 'express';
import * as ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

productsRouter.post('/products', ProductsController.createNewProduct);

export default productsRouter;