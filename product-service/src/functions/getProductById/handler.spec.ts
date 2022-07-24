import { getProductById } from '../handlers';
import products from '../../mocks/products.json';
import eventMock from './mock.json';

describe('getProductById', () => {
    it('should return product by id', async () => {
        const response = await getProductById(eventMock, null);
        const parsedBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(200);
        expect(parsedBody).toEqual(products[0])
    });

    it('should return Bad Request exception if uuid is not correct', async () => {
        const response = await getProductById({
                "pathParameters": {
                    "productUUID": "not_uuid"
                }
            }, null);

        const parsedBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(400);
        expect(parsedBody).toEqual({"errors": ["productUUID must be a valid UUID"] })
    });

    it('should return Not Found exception if product can not be found', async () => {
        const response = await getProductById({
            "pathParameters": {
                "productUUID": "7567ec4b-b10c-48c5-9345-fc73c48a80ab"
            }
        }, null);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual('Not Found')
    });
});
