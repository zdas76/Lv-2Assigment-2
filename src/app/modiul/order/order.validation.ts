import { z } from "zod";

const OrderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  productId: z.string().min(1),
  price: z.number().gt(1),
  quantity: z.number().gt(1, { message: "Must be 1 or more order" }),
});

export default OrderValidationSchema;
