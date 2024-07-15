import { Producer, Product } from '../../mongodb/models';
import { iProducer } from '../../types/Producer';
import { iProduct } from '../../types/Product';

export interface getProductArgs {
  _id: string;
}

export const getProduct = async (args: getProductArgs) => {
  const productFound: iProduct | null = await Product.findById(args._id).lean();
  const producerFound: iProducer | null = await Producer.findById(
    productFound?.producerId
  ).lean();

  if (!productFound || !producerFound) {
    throw new Error(`No product found with id: ${args._id}`);
  }

  return {
    name: productFound.name,
    vintage: productFound.vintage,
    producer: producerFound,
  };
};
