import { IProductService, ProductService } from '../../services/product.service';
import { getProductsListHandler } from './handler';
import { productServiceMocks } from '../../mocks/product-service.mocks';

describe('getProductsList', () => {
  let productService: ProductService;
  let productRepository: IProductService;

  beforeEach(() => {
    productRepository = {
      getProductById: jest.fn(),
      getProductsList: jest.fn(),
      createProduct: jest.fn(),
    };

    productService = new ProductService(productRepository);
  });

  it('should return products list', async () => {
    jest.spyOn(productRepository, 'getProductsList').mockReturnValue(Promise.resolve(productServiceMocks.products))

    const getProductsList = getProductsListHandler(productService);

    const response = await getProductsList();
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody).toEqual(productServiceMocks.products);
    expect(parsedBody.length).toBe(2);
  });
});
