"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productVariantsSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Must be 1 or more characters long" }),
    value: zod_1.z.string().min(1, { message: "Must be 1 or more characters long" }),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().gt(1, { message: "Inventory is required" }),
    inStock: zod_1.z.boolean().default(true),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().gt(1),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(productVariantsSchema),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
