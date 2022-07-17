import { middyfy } from '@libs/lambda';
import products from '../../mocks/products.json'
import schema from "@functions/getProductById/schema";
import { EventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { schemaValidator } from "../../validator";
import { object, string } from "yup";

export const getProductByID: EventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const productUUID = event.pathParameters?.productUUID;

  const product = products.find(product => product.id === productUUID);

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

export const main = middyfy(getProductByID);

main.use([
    schemaValidator({
      pathParameters: object({
        productUUID: string().uuid().required()
      })
    })
]);
