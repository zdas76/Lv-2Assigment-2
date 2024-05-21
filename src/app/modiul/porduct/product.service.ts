import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductfromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await ProductModel.findById({ _id: id });
  return result;
};

// find product by id and update
const updateProduct = async (data: any) => {
  const { updateData, productId } = data;
  const result = await ProductModel.updateOne(
    { _id: productId },
    {
      $set: {
        name: updateData.name,
        description: updateData.description,
        price: updateData.price,
        category: updateData.category,
        tags: updateData.tags,
        variants: updateData.variants,
        inventory: updateData.inventory,
      },
    }
  );
  console.log(result);
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductfromDB,
  getProductByIdFromDB,
  updateProduct,
};
