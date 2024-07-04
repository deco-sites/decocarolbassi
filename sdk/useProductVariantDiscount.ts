import { Product } from "apps/commerce/types.ts";

export const useProductVariantDiscount = (product: Product) => {

  const variant = product?.isVariantOf?.hasVariant.find((
    variant,
  ) => product?.offers?.highPrice! > variant.offers?.highPrice!);

  const productVariantDiscount = variant ?? product;


  return {
    productVariantDiscount
  }
}