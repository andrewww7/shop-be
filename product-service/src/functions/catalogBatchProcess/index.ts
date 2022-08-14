import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  role: 'CatalogBatchProcessRole',
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': [
            'CatalogItemsQueue',
            'Arn'
          ]
        },
        batchSize: 5
      }
    }
  ]
};

export const CatalogBatchProcessRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    RoleName: '${self:service}-catalogBatchProcessRole',
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
      'arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole'
    ],
    Policies: [
      {
        PolicyName: '${self:service}-catalogBatchProcessPolicy',
        PolicyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: [
                'sns:Publish'
              ],
              Resource: { Ref : 'CreateProductTopic' },
            },
          ]
        }
      }
    ]
  }
}
