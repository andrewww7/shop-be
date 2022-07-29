import { handlerPath } from '../../libs/handler-resolver';
import * as path from 'path';

const basePath = handlerPath(path.join(__dirname, '../'));

export default {
  handler: `${basePath}handlers.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        request: {
          schemas: {
            'application/json': {
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
