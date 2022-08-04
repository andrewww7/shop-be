import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: "string"
                },
                description: {
                  type: "string"
                },
                price: {
                  type: "decimal"
                },
                count: {
                  type: "integer"
                }
              },
          }
        },
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
