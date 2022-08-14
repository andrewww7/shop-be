export class AWSConfig {
  public readonly sns_topic_name = process.env.SNS_TOPIC_NAME;
}

const awsConfig = new AWSConfig();
export { awsConfig };
