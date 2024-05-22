import { Request, Response } from "express";
import { OrderService } from "./order.service";
import OrderValidationSchema from "./order.validation";

// Create a order
const createOrder = async (req: Request, res: Response) => {
  const order = req.body;

  if (!order) {
    return res.status(400).json({
      success: false,
      message: "No Order found!",
    });
  }
  const zodValiedData = OrderValidationSchema.parse(order);
  try {
    const result = await OrderService.createOrdertoDB(zodValiedData);
    res.status(200).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Orders failed! to create",
    });
  }
};

// get Order with Search Query

const getOrders = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const result = await OrderService.getAllOrderfromDB(email as string);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Order not found",
    });
  }
};
export const OrderController = {
  createOrder,
  getOrders,
};
