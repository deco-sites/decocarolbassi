
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";

/**
 * @title VTEX Integration - Color Similars
 * @description Add extra data to your loader. This may harm performance
 */
const loader = (
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> =>
  (page: ProductDetailsPage | null) => {
    if (!page?.product) {
      return null;
    }

    console.log("banana", page.product.productID)

    // const { product } = props;

    // const response = await ctx.vcsDeprecated["GET /api/catalog_system/pub/products/crossselling/:type/:productId"]({
    //   type: "similars",
    //   productId: page.product.productID
    // }).then(response => response.json())

    // console.log({ response }, page.product.productID);

    return {
      ...page,
      banana: "teste",
    };

  }
export default loader;
