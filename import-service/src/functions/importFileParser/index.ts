import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'epam-aws-products',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/'
          }
        ],
        existing: true
      }
    }
  ]
}
