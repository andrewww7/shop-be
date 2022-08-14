import { middyfy } from '../../libs/lambda';
import { SQSEvent } from 'aws-lambda';
import { IProductService } from '../../services/product.service';
import { Product } from '../../types/product.model';
import { SNS } from 'aws-sdk';
import { productService, sns } from '../main';
import { awsConfig } from '../../config/aws.config';

export const catalogBatchProcessHandler = (productService: IProductService, sns: SNS) => async (event: SQSEvent) => {
  const records = event.Records;

  const products = records.map(({ body }) => JSON.parse(body) as Product);

  console.log('All products' ,products)

  for (const product of products) {
    await productService.createProduct(product);

    console.log('Product was created in a DB: ', JSON.stringify(product));

    try {
      await sns.publish({
        Subject: 'Product was created!',
        TopicArn: awsConfig.sns_topic_name,
        Message: JSON.stringify(product),
      }).promise()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: 'OK'
  }
};

export const catalogBatchProcess = middyfy(catalogBatchProcessHandler(productService, sns));
