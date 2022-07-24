import { getProductsList } from '../handlers';
import products from '../../mocks/products.json';

describe('getProductsList', () => {
  it('should return products list', async () => {
    const response = await getProductsList({}, null);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody).toEqual(products)
    expect(parsedBody.length).toBe(8);
  });
});
