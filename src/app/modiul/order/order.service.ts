import { TInventory } from "./../porduct/product.interface";
import { object } from "zod";
import { TProduct } from "../porduct/product.interface";
import { ProductModel } from "../porduct/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrdertoDB = async (data: TOrder) => {
  const fineProdect = await ProductModel.findById({ _id: data.productId });

  if (!fineProdect) {
    return { success: false, message: "Product Id Not valied" };
  }

  if (data.quantity <= fineProdect.inventory.quantity) {
    let newQuantity = fineProdect.inventory.quantity - data.quantity;
    const updateQuantity = await ProductModel.findByIdAndUpdate(
      { _id: data.productId },
      { $set: { inventory: { quantity: newQuantity } } },
      { new: true }
    );
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
