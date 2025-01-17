import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { validate } from '../middlewares/validate';
import { productSchema } from '../validators/product.validator';

const router = Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', validate(productSchema), productController.createProduct);
router.put('/products/:id', validate(productSchema), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

export default router;