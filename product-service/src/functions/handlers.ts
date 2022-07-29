import { middyfy } from '../libs/lambda';
import { ProductService } from '../services/product.service';
import { getProductsListHandler } from './getProductsList/handler';
import { getProductByIdHandler } from './getProductById/handler';
import { schemaValidator } from '../validator';
import { number, object, string } from 'yup';
import { client } from '../data-access/database';
import { ProductsRepository } from '../data-access/repository/products.repository';
import { createProductHandler } from './createProduct/handler';

client.connect();

const productRepository = new ProductsRepository(client);
const productService = new ProductService(productRepository);

export const getProductsList = middyfy(getProductsListHandler(productService));

export const getProductById = middyfy(getProductByIdHandler(productService));

export const createProduct = middyfy(createProductHandler(productService));

getProductById.use([
  schemaValidator({
    pathParameters: object({
      productUUID: string().uuid().required()
    })
  })
]);

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
