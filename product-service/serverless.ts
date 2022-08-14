import type { AWS } from '@serverless/typescript';
import { getProductsList, getProductById, createProduct, catalogBatchProcess, CatalogBatchProcessRole } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-webpack', 'serverless-offline', 'serverless-dotenv-plugin'],

  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs14.x',

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },

    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sns:Publish',
        Resource: [
          { Ref : 'CreateProductTopic' },
        ]
      },
    ],
  },

  functions: {
    getProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess
  },
  package: { individually: false, excludeDevDependencies: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.js'
    },
    autoswagger: {
      title: 'AWS Course EPAM - Online Shop',
      typefiles: ['./src/types/product.model.ts']
    },
  },

  resources: {
    Resources: {
      CatalogBatchProcessRole,
      CreateProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'create-product-topic'
        }
      },
      CreateProductTopicSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          TopicArn: { Ref : 'CreateProductTopic' },
          Protocol: 'email',
          Endpoint: 'andrewboxonko@gmail.com'
        }
      },
      CatalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:service}-catalog-items-queue',
          RedrivePolicy: {
            deadLetterTargetArn: {
              'Fn::GetAtt': [
                'CatalogItemsDLQ',
                'Arn'
              ]
            },
            maxReceiveCount: 5
          }
        }
      },
      CatalogItemsDLQ: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:service}-catalog-items-queue-dl'
        }
      }
    },
  },
};

module.exports = serverlessConfiguration;
