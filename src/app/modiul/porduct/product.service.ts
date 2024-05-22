import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductfromDB = async (data?: string | undefined) => {
  if (data) {
    const result = await ProductModel.find({
      $or: [
        { description: { $regex: data } },
        { name: { $regex: data } },
        { category: { $regex: data } },
      ],
    });

    if (result.length > 0) {
      return result;
    } else {
      return {
        success: false,
        message: "Data not found",
      };
    }
  } else {
    const result = await ProductModel.find();
    return result;
  }
};

const getProductByIdFromDB = async (id: string) => {
  const result = await ProductModel.findById({ _id: id });
  return result;
};

// find product by id and update
const updateProduct = async (data: string | any) => {
  const { updateData, productId } = data;
  const result = await ProductModel.findOneAndUpdate(
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

  return result;
};

const deletePorductforDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id: id });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductfromDB,
  getProductByIdFromDB,
  updateProduct,
  deletePorductforDB,
};
