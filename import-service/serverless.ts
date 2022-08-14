import type { AWS } from '@serverless/typescript';
import { importProductFile, importFileParser } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dotenv-plugin', 'serverless-iam-roles-per-function'],

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
          'arn:aws:s3:::epam-aws-products/'
        ]
      },
      {
        Effect: 'Allow',
        Action: [
          's3:*'
        ],
        Resource: [
          'arn:aws:s3:::epam-aws-products/*'
        ]
      }
    ]
  },
  functions: {
    importProductFile,
    importFileParser
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.js'
    },
  },
};

module.exports = serverlessConfiguration;
