import csv from 'csv-parser';
import { middyfy } from '../../libs/lambda';
import { S3, SQS } from 'aws-sdk';
import { s3, sqs } from '../main';
import { S3Event } from 'aws-lambda';
import { awsConfig } from '../../config/aws.config';

export const importFileParserHandler = (s3: S3, sqs: SQS) => async (event: S3Event) => {
  const bucketName = awsConfig.products_bucket_name;

  const record = event.Records[0];

  const key = record.s3.object.key;

  await new Promise((_, reject) => {
    s3
      .getObject({ Bucket: bucketName, Key: key })
      .createReadStream()
      .pipe(csv())
      .on('data', async (product) => {
        const message = await sqs
          .sendMessage({
            QueueUrl: awsConfig.sqs_queue_name,
            MessageBody: product,
          })
          .promise();

        console.log(`Parsed product message was sent into sqs queue: ${JSON.stringify(message)}`);

      })
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

export const importFileParser = middyfy(importFileParserHandler(s3, sqs));
