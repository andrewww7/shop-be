import { IProductService } from '../../services/product.service';
import { Product } from '../../types/product.model';
import { number, object, string } from 'yup';
import { middyfy } from '../../libs/lambda';
import { schemaValidator } from '../../validator';
import { productService } from '../main';

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

export const createProduct = middyfy(createProductHandler(productService));

createProduct.use([
  schemaValidator({
    body: object({
      title: string().required(),
      description: string().required(),
      price: number().positive().required(),
      count: number().positive().required(),
    })
  })
]);
