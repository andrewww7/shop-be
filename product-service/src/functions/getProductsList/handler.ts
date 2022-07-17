import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from "aws-lambda";
import products from '../../mocks/products.json'

const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(products)
  }
};

export const main = middyfy(getProductsList);
