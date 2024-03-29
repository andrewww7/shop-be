import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductsList`,
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
            description: 'Internal Server Error'
          }
        }
      },
    },
  ],
};
