import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import ProductGridImages from "../../islands/ProductImages.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";

export type ProductPolicy = {
  title: string;
  description: HTML;
};

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  productExchangesReturnsPolicy?: ProductPolicy;
}

export default function ProductDetails(
  { page, productExchangesReturnsPolicy }: Props,
) {
  if (!page?.seo) {
    return <NotFound />;
  }

  const { breadcrumbList } = page;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  return (
    <div class="w-full flex flex-col gap-6 lg:py-10 lg:pl-8">
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-auto">
          <ProductGridImages page={page} />
        </div>
        <div className="w-full lg:w-2/6">
          <div className="sticky top-32">
            <ProductInfo
              page={page}
              productExchangesReturnsPolicy={productExchangesReturnsPolicy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
