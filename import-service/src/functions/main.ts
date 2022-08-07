import { S3, SQS } from 'aws-sdk';

export const s3 = new S3({ region: 'eu-west-1' });

export const sqs = new SQS({ region: 'eu-west-1' });
