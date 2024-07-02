import type { Product } from "apps/commerce/types.ts";


export const useSimilarColors = (isSimilarTo: Product[] | undefined) => {
  if (!isSimilarTo || isSimilarTo.length === 0) return undefined;

  const similarColors = isSimilarTo.map((similar) => {
    return {
      url: similar.url ?? "",
      sku: similar.sku ?? "",
      color: similar.additionalProperty?.find((property) => property.name === "Cores")?.value ?? "",
      specificColor: similar.isVariantOf?.additionalProperty?.find(({ name }) => name === "Cor exata")?.value ?? "",
    };
  });

  return similarColors;
};