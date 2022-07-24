import { handlerPath } from '../../libs/handler-resolver';
import * as path from "path";

const basePath = handlerPath(path.join(__dirname, '../'));

export default {
  handler: `${basePath}handlers.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        responses: {
          200: {
            description: 'OK',
            bodyType: 'Products'
          },
          500: {
            description: "Internal Server Error"
          }
        }
      },
    },
  ],
};
