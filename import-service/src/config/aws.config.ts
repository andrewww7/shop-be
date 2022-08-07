export class AWSConfig {
    public readonly products_bucket_name = process.env.PRODUCTS_BUCKET_NAME;

    public readonly sqs_queue_name = process.env.SQS_QUEUE_NAME;
}

const awsConfig = new AWSConfig();
export { awsConfig };
