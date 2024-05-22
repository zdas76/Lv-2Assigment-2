import { ProductModel } from "../porduct/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// Creact a order and update product quantity

const createOrdertoDB = async (data: TOrder) => {
  const fineProdect = await ProductModel.findById({ _id: data.productId });

  if (!fineProdect) {
    return { success: false, message: "Product Id Not valied" };
  }

  if (data.quantity <= fineProdect.inventory.quantity) {
    let newQuantity = fineProdect.inventory.quantity - data.quantity;
    let updateQuantity = await ProductModel.findByIdAndUpdate(
      { _id: data.productId },
      { $set: { inventory: { quantity: newQuantity } } },
      { new: true }
    );
    if (updateQuantity?.inventory.quantity == 0) {
      let updateQuantity = await ProductModel.findByIdAndUpdate(
        { _id: data.productId },
        { $set: { inventory: { quantity: 0, inStock: false } } },
        { new: true }
      );
    }
    const result = await OrderModel.create(data);
    return {
      data: result,
      success: true,
      message: "Insufficient quantity available in inventory",
    };
  } else {
    return {
      success: false,
      message: "Insufficient quantity available in inventory",
    };
  }
};

// Get all order form bd with serch params;

const getAllOrderfromDB = async (email?: string | undefined) => {
  if (email) {
    const result = await OrderModel.find({ email: email });
    return result;
  } else {
    const result = await OrderModel.find();
    return result;
  }
};

export const OrderService = {
  createOrdertoDB,
  getAllOrderfromDB,
};
