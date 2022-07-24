import { Product } from "../types/product.model";
import products from '../mocks/products.json'

export interface IProductService {
    getProductsList(): Product[];

    getProductById(productUUID: string): Product;
}

export class ProductService implements IProductService {
    public getProductsList(): Product[] {
        return products;
    }

    public getProductById(productUUID: string): Product {
        console.log(productUUID)
        return products.find(product => product.id === productUUID);
    }
}
