import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.basicAuthorizer`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth',
        cors: true,
        request: {
          schemas: {
            'application/json': {
              type: 'object',
              properties: {},
            },
          },
        },
      },
    },
  ],
};
