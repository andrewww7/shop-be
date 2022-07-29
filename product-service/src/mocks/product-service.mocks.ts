import { Product } from '../types/product.model';

class ProductServiceMocks {
  readonly products = [{
    id: '1',
    title: 'title1',
  } as Product, {
    id: '2',
    title: 'title2',
  } as Product
  ];

  readonly event: {
    pathParameters: {
      productUUID: "1"
    }
  }
}

const productServiceMocks = new ProductServiceMocks();

export { productServiceMocks };
