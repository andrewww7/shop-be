import { IProductService, ProductService } from '../../services/product.service';
import { productServiceMocks } from '../../mocks/product-service.mocks';
import { getProductByIdHandler } from './handler';

describe('getProductById', () => {
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

  it('should return product by id', async () => {
    jest.spyOn(productRepository, 'getProductById').mockReturnValue(
      Promise.resolve(productServiceMocks.products[0])
    );

    const getProductById = getProductByIdHandler(productService);

    const response = await getProductById(productServiceMocks.event);
    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody).toEqual(productServiceMocks.products[0])
  });

  it('should return Bad Request exception if uuid is not correct', async () => {
    jest.spyOn(productRepository, 'getProductById')

    const getProductById = getProductByIdHandler(productService);

    const response = await getProductById({
      "pathParameters": {
        "productUUID": "not_uuid"
      }
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(parsedBody).toEqual({"errors": ["productUUID must be a valid UUID"]})
  });

  it('should return Not Found exception if product can not be found', async () => {
    jest.spyOn(productRepository, 'getProductById').mockReturnValue(Promise.resolve(null))

    const getProductById = getProductByIdHandler(productService);

    const response = await getProductById({
      "pathParameters": {
        "productUUID": "7567ec4b-b10c-48c5-9345-fc73c48a80ab"
      }
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual('Not Found')
  });
});
