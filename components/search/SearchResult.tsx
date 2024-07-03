import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { Device } from "apps/website/matchers/device.ts";
import { AppContext } from "../../apps/site.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import NotFound from "../../sections/Product/NotFound.tsx";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import ProductGalleryWithBanner, {
  CategoryBannersMediaSource,
} from "../product/ProductGalleryWithBanner.tsx";
import SearchTitle from "./SearchTitle.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  categoryBannersMediaSources?: CategoryBannersMediaSource[];
  titlePage?: string;
}

function Result({
  page,
  layout,
  startingPage = 0,
  url: _url,
  categoryBanners,
  device,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
  device: Device;
  categoryBanners?: CategoryBannersMediaSource;
  titlePage?: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const currentBreadCrumb = breadcrumb.itemListElement.at(-1)?.name ?? "";
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isCollectionPage = pageInfo?.pageTypes?.some((
    type,
  ) => (type === "Collection" || type === "Search"));

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;
  const isSearchPage = url.search.includes("?q");

  const pageName = url.pathname.split("/")[1] ?? "";

  return (
    <>
      <div
        class={`max-w-[1750px] m-auto px-4 sm:px-8 ${
          isFirstPage || !isPartial ? "sm:pt-10" : ""
        }  `}
      >
        {(isFirstPage || !isPartial) && (
          <>
            {isSearchPage
              ? (
                <h2 class="max-w-[1750px] mb-6 text-dark-blue font-light sm:font-normal text-base sm:text-[24px] m-auto leading-[150%]">
                  RESULTADO DA BUSCA POR:{" "}
                  <strong class="uppercase font-semibold text-dark-blue text-base sm:text-[24px]">
                    {page?.seo?.title !== "Category_Page_Title" &&
                      page?.seo?.title}
                  </strong>
                </h2>
              )
              : !currentBreadCrumb
              ? <SearchTitle title={pageName} />
              : <SearchTitle title={currentBreadCrumb} />}

            <SearchControls
              sortOptions={sortOptions}
              filters={filters}
              breadcrumb={breadcrumb}
              isCollectionPage={isCollectionPage}
              isSearchPage={isSearchPage}
              collectionName={pageName}
              displayFilter={layout?.variant === "drawer"}
            />
          </>
        )}
        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} sortOptions={sortOptions} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            {categoryBanners && !isSearchPage && (isFirstPage || !isPartial)
              ? (
                <ProductGalleryWithBanner
                  products={products}
                  offset={offset}
                  layout={{ columns: layout?.columns, format }}
                  pageInfo={pageInfo}
                  url={url}
                  categoryBanners={categoryBanners}
                  device={device}
                />
              )
              : (
                <ProductGallery
                  products={products}
                  offset={offset}
                  layout={{ columns: layout?.columns, format }}
                  categoryBanners={categoryBanners!}
                  pageInfo={pageInfo}
                  url={url}
                  device={device}
                />
              )}
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  { page, ...props }: ReturnType<typeof loader>,
) {
  if (!page || !page.products.length) {
    return <NotFound page={page} />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const { categoryBannersMediaSources } = props;

  const categoryBanners = categoryBannersMediaSources?.find((
    { matcher },
  ) => new URLPattern({ pathname: matcher }).test(req.url));

  return {
    ...props,
    url: req.url,
    categoryBanners: categoryBanners,
    device: ctx.device,
  };
};

export default SearchResult;
