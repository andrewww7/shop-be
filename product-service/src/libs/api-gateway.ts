import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type APIGatewayProxyEventCustom<S> = Omit<APIGatewayProxyEvent, 'pathParameters'> & { pathParameters: FromSchema<S> }
export type EventAPIGatewayProxyEvent<S> = Handler<APIGatewayProxyEventCustom<S>, APIGatewayProxyResult>
