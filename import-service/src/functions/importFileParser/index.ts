import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  role: 'ImportFileParserRole',
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

export const ImportFileParserRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${self:service}-importFileParserRole',
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: ['lambda.amazonaws.com']
          },
          Action: 'sts:AssumeRole'
        }
      ]
    },
    ManagedPolicyArns: [
      'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      'arn:aws:iam::aws:policy/AmazonS3FullAccess'
    ],
    Policies: [
      {
        PolicyName: '${self:service}-importFileParserPolicy',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: ['sqs:SendMessage'],
              Resource: {'Fn::Sub': 'arn:aws:sqs:*:${AWS::AccountId}:product-service-catalog-items-queue'}
            }
          ]
        }
      }
    ]
  }
}
