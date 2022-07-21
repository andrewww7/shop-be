import type { AWS } from '@serverless/typescript';
import { getProductById, getProductsList } from "@functions/index";

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-webpack'],
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
  functions: {
    getProductsList,
    getProductById
  },
  package: { individually: true },
  custom: {
      webpack: {
      webpackConfig: 'webpack.config.js',
          includeModules: false,
          packager: 'npm',
          excludeFiles: 'src/**/*.test.js'
    },
  },
};

module.exports = serverlessConfiguration;
