import { Product } from "apps/commerce/types.ts";

export const useProductField = (product: Product | undefined, property: string) => {
  const result = product?.isVariantOf?.additionalProperty.find((
    { name },
  ) => name === property)?.value;

  return result;
}