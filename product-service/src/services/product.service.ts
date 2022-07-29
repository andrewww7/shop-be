import { Product } from '../types/product.model';
import { randomUUID } from 'crypto'

export interface IProductService {
  getProductsList(): Promise<Product[]>;

  getProductById(productUUID: string): Promise<Product>;

  createProduct(product: Product): Promise<Product>;
}

export class ProductService implements IProductService {

  constructor(private readonly productsRepository: IProductService) {}

  public async getProductsList(): Promise<Product[]> {
    return this.productsRepository.getProductsList();
  }

  public async getProductById(productUUID: string): Promise<Product> {
    return this.productsRepository.getProductById(productUUID);
  }

  public async createProduct(product: Product): Promise<Product> {
    return this.productsRepository.createProduct({
      ...product,
      id: randomUUID()
    });
  }
}
