import { Producer, Product } from '../../mongodb/models';
import { iProduct } from '../../types/Product';

export interface createProductArgs {
  input: iProduct[];
}

export const createProduct = async (args: createProductArgs) => {
  const createdProducts: any = await Product.insertMany([...args.input], {
    lean: true,
    rawResult: true,
  });

  const { insertedIds } = createdProducts;
  const createdProductsIds: string[] = [];

  for (const property in insertedIds) {
    createdProductsIds.push(insertedIds[property]);
  }

  const createdProductsInDB = await Product.find({
    _id: { $in: createdProductsIds },
  });

  return createdProductsInDB.map(async (productFound: iProduct) => {
    return {
      name: productFound.name,
      vintage: productFound.vintage,
      producer: await Producer.findById(productFound.producerId).lean(),
    };
  });
};
