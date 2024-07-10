import type { Product } from "apps/commerce/types.ts";
import { useProductField } from "./useProductField.ts";


export const useSimilarColors = (isSimilarTo: Product[] | undefined) => {
  if (!isSimilarTo || isSimilarTo.length === 0) return undefined;

  const similarColors = isSimilarTo.map((similar) => {
    return {
      url: similar.url ?? "",
      sku: similar.sku ?? "",
      color: similar.additionalProperty?.find((property) => property.name === "Cores")?.value ?? "",
      specificColor: useProductField(similar, "Cor exata")
    };
  });

  return similarColors;
};