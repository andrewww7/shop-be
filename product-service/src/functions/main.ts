import { client } from '../data-access/database';
import { ProductsRepository } from '../data-access/repository/products.repository';
import { ProductService } from '../services/product.service';

client.connect();

const productRepository = new ProductsRepository(client);

export const productService = new ProductService(productRepository);
