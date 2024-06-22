import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { SectionProps } from "deco/types.ts";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import { MediaOptionProps } from "../../components/share/ShareProduct.tsx";
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
  shareSocialOptions?: MediaOptionProps[];
}

export default function ProductDetails(
  {
    page,
    productExchangesReturnsPolicy,
    device,
    shareSocialOptions,
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

  return (
    <div class="w-full flex flex-col gap-6 lg:py-10 lg:pl-8 2xl:pl-20">
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-auto">
          <ProductGridImages page={page} />
        </div>
        <div className="w-full lg:w-2/4 2xl:w-2/6">
          <ProductInfo
            page={page}
            productExchangesReturnsPolicy={productExchangesReturnsPolicy}
            device={device}
            socialOptions={shareSocialOptions}
          />
        </div>
      </div>
    </div>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  async function getRecommendations() {
    const productId = props?.page?.product?.inProductGroupWithID;

    if (!productId) {
      console.error("Product ID is missing.");
      return null;
    }

    try {
      const data = await ctx.io.query<
        {
          productRecommendations: {
            productName: string;
            linkText: string;
            items: {
              images: { imageUrl: string }[];
              sellers: { commertialOffer: { Price: number } }[];
            }[];
          };
        },
        { productId: string }
      >({
        operationName: "productRecommendations",
        variables: {
          productId,
        },
        query: `
          query productRecommendations($productId: ID!) {
            productRecommendations(
              identifier: { field: id, value: $productId }, 
              type: accessories
            ) @context(provider: "vtex.search-graphql") {
              productName
              linkText
              items(filter: FIRST_AVAILABLE) {
                images(quantity: 2) {
                  imageUrl
                }
                sellers {
                  commertialOffer {
                    Price
                  }
                }
              }
            }
          }
        `,
      });
      return data.productRecommendations;
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      return null;
    }
  }

  const productRecommendations = await getRecommendations();

  return {
    ...props,
    device: ctx.device,
    productRecommendations: productRecommendations,
  };
};

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
