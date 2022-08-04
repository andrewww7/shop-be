import type { AWS } from '@serverless/typescript';
import { getProductsList, getProductById, createProduct } from './src/functions';

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
  },
  functions: {
    getProductsList,
    getProductById,
    createProduct
  },
  package: { individually: true },
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.js',
      includeModules: false,
      packager: 'npm',
      excludeFiles: 'src/**/*.test.js'
    },
    autoswagger: {
      title: 'AWS Course EPAM - Online Shop',
      typefiles: ['./src/types/product.model.ts']
    },
  },
};

module.exports = serverlessConfiguration;
