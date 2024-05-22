"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
// Create a new proeuct
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    // check received value
    if (!product) {
        return res.status(400).json({
            success: false,
            message: "No product found!",
        });
    }
    // send value to zod for validation
    const zodValiedData = product_validation_1.default.parse(product);
    try {
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodValiedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: "Fail! to created Product",
        });
    }
});
// Get All Product
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        const result = yield product_service_1.ProductServices.getAllProductfromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: "Get product successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "No product found!",
        });
    }
});
// Get one product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductByIdFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product is retrived successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found",
        });
    }
});
// Update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = req.body;
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.updateProduct({
            updateData,
            productId,
        });
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not updated",
        });
    }
});
const deletePorduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deletePorductforDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not deleted",
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deletePorduct,
};
