import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.basicAuthorizer`,
  role: 'LambdaDataRead',
  events: [
    {
      http: {
        method: 'get',
        path: 'auth',
        cors: true,
      },
    },
  ],
};
