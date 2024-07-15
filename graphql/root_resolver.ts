import { getProduct, getProductArgs } from './resolvers/getProduct';
import { getProducts, getProductsArgs } from './resolvers/getProducts';
import { createProduct, createProductArgs } from './resolvers/createProduct';
import { deleteProduct, deleteProductsArgs } from './resolvers/deleteProduct';
import { updateProduct, updatedProductArgs } from './resolvers/updateProduct';
import { fetchProducts, fetchProductsArgs } from './resolvers/fetchProducts';

export const root = {
  product: async (args: getProductArgs) => {
    return getProduct(args);
  },
  products: async (args: getProductsArgs) => {
    return getProducts(args);
  },
  createProducts: async (args: createProductArgs) => {
    return createProduct(args);
  },
  deleteProducts: async (args: deleteProductsArgs) => {
    return deleteProduct(args);
  },
  updateProduct: async (args: updatedProductArgs) => {
    return updateProduct(args);
  },
  fetchProducts: async (args: fetchProductsArgs) => {
    return fetchProducts(args);
  },
};
