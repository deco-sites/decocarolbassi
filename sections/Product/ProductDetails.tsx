import { ProductDetailsPage } from "apps/commerce/types.ts";
import ProductGridImages from "../../components/product/Gallery/ProductGridImages.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page?.seo) {
    return <NotFound />;
  }

  const { breadcrumbList } = page;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  console.log(breadcrumb);

  return (
    <div class="w-full flex flex-col gap-6 lg:py-10 lg:pl-8">
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />

      <div class="flex flex-col gap-6 lg:flex-row ">
        <ProductGridImages
          page={page}
        />
        <ProductInfo
          page={page}
        />
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
