export type TVariants = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: "smartphone" | "Apple" | "iso";
  variants: [TVariants];
  inventory: TInventory;
};

export interface IupdateProduct extends TProduct {
  _id: string;
}
