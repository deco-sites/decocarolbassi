import { Head } from "$fresh/runtime.ts";
import { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import { Device } from "apps/website/matchers/device.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import ProductCardWithBannerMobile from "../../islands/ProductCardWithBannerMobile.tsx";
import ShowMore from "../../islands/ShowMore.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { Format } from "../search/SearchResult.tsx";
import Spinner from "../ui/Spinner.tsx";
import ProductCardWithBannerDesktop from "./ProductCardWithBanner/ProductCardWithBannerDesktop.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export type MediaSource = {
  image?: ImageWidget;
  video?: VideoWidget;
  type?: "image" | "video";
  action?: {
    href: string;
  };
};

/** @title {{{matcher}}} */
export interface CategoryBannersMediaSource {
  /**
   * @title Url da Página
   * @description Coloque a url da página, por exemplo /sapatos
   */
  matcher: string;
  banner1: MediaSource;
  banner2: MediaSource;
  banner3: MediaSource;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  offset: number;
  layout?: {
    columns?: Columns;
    format?: Format;
  };
  url: URL;
  /** @title Banners da Categoria */
  categoryBanners: CategoryBannersMediaSource;
  device: Device;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function ProductGalleryWithBanner(
  {
    products,
    pageInfo,
    layout,
    offset,
    url,
    categoryBanners,
    device,
  }: Props,
) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  const nextPage = pageInfo.nextPage
    ? new URL(pageInfo.nextPage, url.href)
    : null;
  const partialUrl = nextPage ? new URL(nextPage.href) : null;
  if (pageInfo.nextPage && nextPage) {
    partialUrl?.searchParams.set("partial", "true");
  }

  return (
    <div
      class={`${
        !categoryBanners &&
        `grid ${mobile} gap-2 items-center ${desktop} sm:gap-2`
      }`}
    >
      {layout?.format == "Show More" && (
        <Head>
          {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage} />}
          {pageInfo.previousPage && (
            <link rel="prev" href={pageInfo.previousPage} />
          )}
        </Head>
      )}
      {products && products.length > 0 && device === "desktop"
        ? (
          <ProductCardWithBannerDesktop
            products={products}
            desktopColumns={desktop}
            mobileColumns={mobile}
            offset={offset}
            platform={platform}
            categoryBanners={categoryBanners}
          />
        )
        : products && products.length > 0 && (
          <ProductCardWithBannerMobile
            products={products}
            desktopColumns={desktop}
            mobileColumns={mobile}
            offset={offset}
            platform={platform}
            categoryBanners={categoryBanners}
          />
        )}

      {(layout && layout?.format === "Show More") && (
        <>
          <ShowMore
            pageInfo={pageInfo}
          >
            {partialUrl && (
              <div>
                <div class="mt-2">
                  <Spinner size={24} />
                </div>
                <button
                  id={`show-more-button-${pageInfo.currentPage}`}
                  class="btn cursor-pointer hidden w-0 h-0 absolute"
                  {...usePartialSection({
                    href: partialUrl.href,
                    mode: "append",
                  })}
                >
                  Show More
                </button>
              </div>
            )}
          </ShowMore>
        </>
      )}
    </div>
  );
}

export default ProductGalleryWithBanner;
