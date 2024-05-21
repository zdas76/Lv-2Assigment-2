import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";

// Create a new proeuct
const createProduct = async (req: Request, res: Response) => {
  const product = req.body.product;
  try {
    const result = await ProductServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All Product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductfromDB();
    res.status(200).json({
      success: true,
      message: "Get all product successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No product found!",
    });
  }
};

// Get one product by id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product is retrived successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
};

// Update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const { productId } = req.params;
    const result = await ProductServices.updateProduct({
      updateData,
      productId,
    });
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product not updated",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
};
