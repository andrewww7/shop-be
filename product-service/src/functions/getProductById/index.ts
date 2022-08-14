import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productUUID}',
        cors: true,
        request: {
          parameters: {
            paths: {
              productUUID: true
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
