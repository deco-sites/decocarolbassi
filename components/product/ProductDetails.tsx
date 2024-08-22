import { AppContext } from "$store/apps/site.ts";
import ProductInfo from "$store/components/product/ProductInfo.tsx";
import { MediaOptionProps } from "$store/components/share/ShareProduct.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import ProductGridImages from "$store/islands/ProductImages.tsx";
import NotFound from "$store/sections/Product/NotFound.tsx";
import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { SectionProps } from "deco/types.ts";

export type ProductPolicy = {
  title: string;
  description: HTML;
};

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  productExchangesReturnsPolicy?: ProductPolicy;
  shareSocialOptions?: MediaOptionProps[];
}

export default function ProductDetails(
  {
    page,
    productExchangesReturnsPolicy,
    device,
    shareSocialOptions,
    buttonsUrl,
    recommendedSize,
    showButtons,
  }: SectionProps<typeof loader>,
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

  // "to have sticky ProductInfo component put this class -> sticky top-32"

  const hasNotNewImages = page?.product?.image?.some((image) =>
    image.name?.toLocaleLowerCase() !== "novas"
  );

  return (
    <div class="w-full flex flex-col gap-6 lg:py-10 lg:pl-8 2xl:pl-20">
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-auto">
          <ProductGridImages page={page} />
        </div>
        <div
          className={`w-full ${
            hasNotNewImages ? "lg:w-full 2xl:w-4/6 " : "lg:w-2/4 2xl:w-2/6"
          }`}
        >
          <ProductInfo
            page={page}
            productExchangesReturnsPolicy={productExchangesReturnsPolicy}
            device={device}
            socialOptions={shareSocialOptions}
            showButtons={showButtons}
            buttonsUrl={buttonsUrl}
            recommendedSize={recommendedSize}
          />
        </div>
      </div>
    </div>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const { buttonsUrl, recommendedSize, showButtons } = await ctx.invoke.site
    .loaders.sizebay({ page: props.page });

  return {
    ...props,
    device: ctx.device,
    showButtons,
    buttonsUrl,
    recommendedSize,
  };
};

export const cache = "no-cache";

export function LoadingFallback() {
  return (
    <div className="w-full flex flex-col gap-6 lg:py-10 lg:pl-8 2xl:pl-20">
      {/* Breadcrumb Skeleton */}
      <div className="hidden sm:flex flex-col w-full gap-4">
        <div className="skeleton h-4 w-3/4 sm:w-52"></div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* ProductGridImages Skeleton */}
        <div className="w-full lg:w-3/5 xl:w-2/3">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
            <div className="skeleton h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[730px] w-full">
            </div>
            <div className="hidden sm:block skeleton h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[730px] w-full">
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5 xl:w-1/3 2xl:w-2/5 relative">
          <div className="sticky top-32">
            {/* ProductInfo Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="skeleton h-8 w-full"></div>
              <div className="skeleton h-4 w-2/3 sm:w-40"></div>
              <div className="skeleton h-16 sm:h-20 w-1/2 sm:w-32"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>

              <div className="skeleton h-12 sm:h-[60px] w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
