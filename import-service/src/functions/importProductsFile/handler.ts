import { object, string } from 'yup';
import { middyfy } from '../../libs/lambda';
import { schemaValidator } from '../../services/import-service.validator';
import { S3 } from 'aws-sdk';
import { s3 } from '../main';
import { awsConfig } from '../../config/aws.config';

export const importProductFileHandler = (s3: S3) => async (event) => {
  const filename = event.queryStringParameters?.name;

  const params = {
    Bucket: awsConfig.products_bucket_name,
    Key: `uploaded/${filename}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  const url = await s3.getSignedUrlPromise('putObject', params);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(url)
  }
};

export const importProductFile = middyfy(importProductFileHandler(s3));

importProductFile.use([
  schemaValidator({
    queryStringParameters: object({
      name: string().required(),
    })
  })
]);
