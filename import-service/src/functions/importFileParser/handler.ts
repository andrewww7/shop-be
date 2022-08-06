import csv from 'csv-parser';
import { middyfy } from '../../libs/lambda';
import { S3 } from 'aws-sdk';
import { s3 } from '../main';
import { S3Event } from 'aws-lambda';
import { s3Config } from '../../config/s3-bucket.config';

export const importFileParserHandler = (s3: S3) => async (event: S3Event) => {
  const bucketName = s3Config.products_bucket_name;

  const record = event.Records[0];

  const key = record.s3.object.key;

  await new Promise((_, reject) => {
    s3
      .getObject({ Bucket: bucketName, Key: key })
      .createReadStream()
      .pipe(csv())
      .on('data', (data) => console.log(`csv file parsed data: ${JSON.stringify(data)}`))
      .on('error', (error) => {
        console.error(error);

        reject(error);
      })
      .on('end', async () => {
        await s3
          .copyObject({
            Bucket: bucketName,
            CopySource: `${bucketName}/${key}`,
            Key: key.replace('uploaded', 'parsed'),
          })
          .promise();

        await s3
          .deleteObject({
            Bucket: bucketName,
            Key: key,
          })
          .promise();
      });
  });
};

export const importFileParser = middyfy(importFileParserHandler(s3));
