export class S3Config {
    public readonly products_bucket_name = process.env.PRODUCTS_BUCKET_NAME;
}

const s3Config = new S3Config();
export { s3Config };

