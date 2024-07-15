import { Producer, Product } from '../../mongodb/models';
import { iProduct } from '../../types/Product';

export interface getProductsArgs {
  _producerId: string;
}

export const getProducts = async (args: getProductsArgs) => {
  const productsFound: iProduct[] = await Product.find({
    producerId: args._producerId,
  }).lean();
  console.log('Products found: ', productsFound.length);

  return productsFound.map(async (productFound: iProduct) => {
    return {
      name: productFound.name,
      vintage: productFound.vintage,
      producer: await Producer.findById(productFound.producerId).lean(),
    };
  });
};
