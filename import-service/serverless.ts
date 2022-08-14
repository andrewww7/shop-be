import type { AWS } from '@serverless/typescript';
import { importProductFile, importFileParser, ImportFileParserRole, ImportProductsFileRole } from './src/functions';

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
  },

  resources: {
    Resources: {
      ImportFileParserRole,
      ImportProductsFileRole
    }
  }
};

module.exports = serverlessConfiguration;
