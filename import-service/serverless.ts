import type { AWS } from '@serverless/typescript';
import { importProductFile, importFileParser } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-iam-roles-per-function', 'serverless-dotenv-plugin'],

  package: { individually: true },

  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.js'
    },

    productServiceName: 'product-service',
  },

  functions: {
    importProductFile,
    importFileParser
  },

  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs14.x',

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
          'arn:aws:s3:::${self:custom.PRODUCTS_BUCKET_NAME}/'
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          's3:*'
        ],
        Resource: [
          'arn:aws:s3:::${self:provider.environment.PRODUCTS_BUCKET_NAME}/*'
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          'sqs:SendMessage'
        ],
        Resource: [
          '!Sub arn:aws:sqs:*:${AWS::AccountId}:${self:custom.productServiceName}-catalog-items-queue'
        ]
      },
    ]
  },
};

module.exports = serverlessConfiguration;
