import { handlerPath } from '../../libs/handler-resolver';
import * as path from 'path';

const basePath = handlerPath(path.join(__dirname, '../'));

export default {
  handler: `${basePath}handlers.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productUUID}',
        cors: true,
        request: {
          parameters: {
            paths: {
              productId: true
            }
          }
        },
        responses: {
          200: {
            description: 'OK',
            bodyType: 'Product'
          },
          400: {
            description: 'Bad Request',
          },
          404: {
            description: 'Not Found',
          },
          500: {
            description: "Internal Server Error"
          }
        }
      },
    },
  ],
};
