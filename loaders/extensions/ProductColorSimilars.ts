
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";

/**
 * @title VTEX Integration - Color Similars
 * @description Add extra data to your loader. This may harm performance
 */

export default function productDetailsPage(
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> {
  return (productDetailsPage: ProductDetailsPage | null) => {
    if (!productDetailsPage?.product) {
      return null;
    }

    const { product } = productDetailsPage;


    const productNewImages = product.image?.filter((image) => image.name?.toLocaleLowerCase() === "novas") ?? [];


    const productSimilars = product.isSimilarTo?.map((similar) => {
      return {
        url: similar.url ?? "",
        sku: similar.sku ?? "",
        color: similar.additionalProperty?.find((property) => property.name === "Cores")?.value ?? ""
      }
    })

    if (productNewImages.length > 0) product.image = productNewImages


    return productDetailsPage;
  };
}
