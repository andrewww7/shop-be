import { IProductService } from '../../services/product.service';
import { Product } from '../../types/product.model';

export const createProductHandler = (productService: IProductService) => async (event) => {
  const product = event?.body as Product;

  const createdProduct = await productService.createProduct(product);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(createdProduct)
  }
};
