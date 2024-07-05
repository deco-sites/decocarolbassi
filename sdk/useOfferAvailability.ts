import { ProductGroup } from "apps/commerce/types.ts";

export const useVariantOfferAvailability = (isVariantOf?: ProductGroup) => {
  const someOfferIsAvailable = isVariantOf?.hasVariant.map((variant) =>
    variant.offers
  ).some((offer) =>
    offer?.offers[0].availability === "https://schema.org/InStock"
  );

  return { hasOfferAvailable: someOfferIsAvailable }
}


export const useSizeVariantOfferAvailability = (index: number, isVariantOf?: ProductGroup) => {
  const sizeOfferIsAvailable = isVariantOf?.hasVariant[index]?.offers?.offers[0]?.availability === "https://schema.org/InStock";

  return { sizeOfferIsAvailable }
}