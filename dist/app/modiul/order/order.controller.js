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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
// Create a order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    if (!order) {
        return res.status(400).json({
            success: false,
            message: "No Order found!",
        });
    }
    const zodValiedData = order_validation_1.default.parse(order);
    try {
        const result = yield order_service_1.OrderService.createOrdertoDB(zodValiedData);
        res.status(200).json({
            success: result.success,
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Orders failed! to create",
        });
    }
});
// get Order with Search Query
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const result = yield order_service_1.OrderService.getAllOrderfromDB(email);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Order not found",
        });
    }
});
exports.OrderController = {
    createOrder,
    getOrders,
};
