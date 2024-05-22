"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const OrderValidationSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email address" }),
    productId: zod_1.default.string().min(1),
    price: zod_1.default.number().gt(1),
    quantity: zod_1.default.number().gt(1, { message: "Must be 1 or more order" }),
});
exports.default = OrderValidationSchema;
