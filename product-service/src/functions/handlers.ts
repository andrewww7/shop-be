import { middyfy } from '../libs/lambda';
import { ProductService } from '../services/product.service';
import { getProductsListHandler } from './getProductsList/handler';
import { getProductByIdHandler } from "./getProductById/handler";
import { schemaValidator } from '../validator';
import { object, string } from 'yup';

const productService = new ProductService();

export const getProductsList = middyfy(getProductsListHandler(productService));

export const getProductById = middyfy(getProductByIdHandler(productService));

getProductById.use([
    schemaValidator({
        pathParameters: object({
            productUUID: string().uuid().required()
        })
    })
]);
