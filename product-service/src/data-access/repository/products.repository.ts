import { Client, QueryConfig } from 'pg';
import { IProductService } from '../../services/product.service';
import { Product } from '../../types/product.model';
import { Stock } from '../../types/stock.model';

export class ProductsRepository implements IProductService {

    constructor(private readonly db: Client) {}

    public async getProductsList(): Promise<Product[]> {
        const query: QueryConfig = {
            text: `SELECT p.*, s.count FROM products p JOIN stocks s ON p.id = s.product_id`,
        };

        const { rows } = await this.db.query(query);

        return rows;
    }

    public async getProductById(productUUID: string): Promise<Product> {
        const query: QueryConfig = {
            text: `SELECT p.*, s.count FROM products p JOIN stocks s ON p.id = s.product_id WHERE p.id = $1`,
            values: [productUUID],
        };

        const { rows } = await this.db.query(query);

        return rows?.[0];
    }

    public async createProduct(product: Product): Promise<Product> {
        try {
            await this.db.query('BEGIN');

            const createProductQuery: QueryConfig = {
                text: `INSERT INTO products (id, title, description, price) VALUES($1, $2, $3, $4) RETURNING *`,
                values: [product.id, product.title, product.description, product.price]
            };

            const { rows: rowsProduct } = await this.db.query<Product>(createProductQuery);

            const createStockQuery = {
                text: `INSERT INTO stocks (product_id, count) VALUES ($1, $2) RETURNING *`,
                values: [rowsProduct?.[0]?.id, product.count],
            };

            const { rows: rowsStocks } = await this.db.query<Stock>(createStockQuery);

            await this.db.query('COMMIT');

            return {
                ...rowsProduct?.[0],
                count: rowsStocks?.[0].count
            };
        } catch (e) {
            await this.db.query('ROLLBACK');
        } finally {
            await this.db.end();
        }
    }
}
