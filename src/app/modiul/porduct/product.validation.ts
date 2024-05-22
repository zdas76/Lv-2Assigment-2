import { z } from "zod";

const productVariantsSchema = z.object({
  type: z.string().min(1, { message: "Must be 1 or more characters long" }),
  value: z.string().min(1, { message: "Must be 1 or more characters long" }),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().gt(1, { message: "Inventory is required" }),
  inStock: z.boolean().default(true),
});

const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().gt(1),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(productVariantsSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
