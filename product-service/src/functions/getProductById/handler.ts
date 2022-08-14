import { IProductService } from '../../services/product.service';

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
