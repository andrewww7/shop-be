import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importProductFile`,
  role: 'ImportProductsFileRole',
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        authorizer: {
          name: 'basicAuthorizer',
          arn: {
            'Fn::GetAtt': [ 'BasicAuthorizerLambdaFunction', 'Arn' ],
          },
          identitySource: 'method.request.header.Authorization',
          type: 'request',
        },
      }
    }
  ]
}

export const ImportProductsFileRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${self:service}-importProductsFileRole',
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: [
              'lambda.amazonaws.com'
            ]
          },
          Action: 'sts:AssumeRole'
        }
      ]
    },
    ManagedPolicyArns: [
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      'arn:aws:iam::aws:policy/AmazonS3FullAccess'
    ],
  }
}
