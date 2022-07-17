import { BaseSchema } from 'yup'

export const schemaValidator = (schema: {
    body?: BaseSchema,
    queryStringParameters?: BaseSchema
    pathParameters?: BaseSchema
}) => {
    const before = async request => {

        try {
            const { body, queryStringParameters, pathParameters } = request.event;

            if (schema.body) {
                schema.body.validateSync(body)
            }

            if (schema.queryStringParameters) {
                schema.queryStringParameters.validateSync(
                    queryStringParameters ?? {}
                )
            }

            if (schema.pathParameters) {
                schema.pathParameters.validateSync(
                    pathParameters ?? {}
                )
            }

            return Promise.resolve()
        } catch (e) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    errors: e.errors
                })
            }
        }
    }

    return {
        before,
    }
}
