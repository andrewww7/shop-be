import { IProductService } from '../../services/product.service';
import { middyfy } from '../../libs/lambda';
import { productService } from '../main';

export const getProductsListHandler = (productService: IProductService) => async () => {
  const products = await productService.getProductsList();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(products)
  }
};

export const getProductsList = middyfy(getProductsListHandler(productService));
