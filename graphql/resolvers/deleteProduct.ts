import { Product } from '../../mongodb/models';

export interface deleteProductsArgs {
  _ids: string[];
}

export const deleteProduct = async (args: deleteProductsArgs) => {
  const deletedProducts = await Product.deleteMany({
    _id: { $in: args._ids },
  });

  if (deletedProducts.deletedCount > 0) {
    return true;
  }
  return false;
};
