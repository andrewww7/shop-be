import { IProductService } from '../../services/product.service';
import { middyfy } from '../../libs/lambda';
import { productService } from '../main';
import { schemaValidator } from '../../validator';
import { object, string } from 'yup';

export const getProductByIdHandler = (productService: IProductService) => async (event) => {
  const productUUID = event.pathParameters?.productUUID;

  const product = await productService.getProductById(productUUID);

  if (!product) {
    return {
      statusCode: 404,
      body: 'Not Found'
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(product)
  }
};

export const getProductById = middyfy(getProductByIdHandler(productService));

getProductById.use([
  schemaValidator({
    pathParameters: object({
      productUUID: string().uuid().required()
    })
  })
]);
