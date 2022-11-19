import path from 'node:path';
import {Router} from 'express';
import multer  from 'multer';

import { createCategories } from './app/useCases/categories/createCategories';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProducts } from './app/useCases/products/createProducts';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategories';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrders } from './app/useCases/orders/createOrders';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrders } from './app/useCases/orders/cancelOrders';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename (req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

router.get('/categories', listCategories);

router.post('/categories', createCategories);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProducts);

router.get('/categories/:categoryId/products', listProductsByCategories);

router.get('/orders', listOrders);

router.post('/orders',createOrders);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrders);
