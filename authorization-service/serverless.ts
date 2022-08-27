import type { AWS } from '@serverless/typescript';
import { basicAuthorizer } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '3',
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
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
  },

  resources: {
    Resources: {
      LambdaDataRead: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: '${self:service}-LambdaDataReadRole-${self:provider.region}',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Service: 'lambda.amazonaws.com'
                },
                Action: 'sts:AssumeRole'
              }
            ]
          },
          ManagedPolicyArns: [
            'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            'arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole'
          ],
          Policies: [
            {
              PolicyName: "lambdaDataReadPolicy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "s3:Lis*",
                      "s3:Get*",
                      "s3:Put*",
                      "s3:Del*"
                    ],
                    Resource: [
                      "arn:aws:s3:::*",
                      "arn:aws:s3:::*/*"
                    ]
                  },
                  {
                    Effect: "Allow",
                    Action: [
                      "sqs:*"
                    ],
                    Resource: [
                      "arn:aws:sqs:*:${aws:accountId}:*"
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    }
  },

  functions: { basicAuthorizer },

  package: { individually: true },

  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: true,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.js'
    },
  },
}

module.exports = serverlessConfiguration;
