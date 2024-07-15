import { Producer, Product } from '../../mongodb/models';
import { iProduct } from '../../types/Product';

export interface updatedProductArgs {
  _id: string;
  input: iProduct;
}

export const updateProduct = async (args: updatedProductArgs) => {
  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: args._id,
    },
    {
      $set: {
        name: args.input['name'],
        vintage: args.input['vintage'],
        producerId: args.input['producerId'],
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();

  console.log({ updatedProduct });

  const producer = await Producer.findById(args.input['producerId']).lean();

  if (!updatedProduct || !producer) {
    throw new Error(`Cannot update product with id: ${args._id}`);
  }

  return {
    name: updatedProduct.name,
    vintage: updatedProduct.vintage,
    producer: producer,
  };
};
