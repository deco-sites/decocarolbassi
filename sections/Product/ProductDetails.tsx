import { HTMLWidget as HTML } from "apps/admin/widgets.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { SectionProps } from "deco/types.ts";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import { MediaOptionProps } from "../../components/share/ShareProduct.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import ProductGridImages from "../../islands/ProductImages.tsx";
import NotFound from "../../sections/Product/NotFound.tsx";
import { getCookies, setCookie } from "std/http/mod.ts";
import { AppContext } from "../../apps/site.ts";

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
    productRecommendations,
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
          />
        </div>
      </div>
    </div>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const productId = props.page?.product.inProductGroupWithID;

  const data = await ctx.invoke.site.loaders
    .productRecommendations({
      productId,
    });

  const cookies = getCookies(_req.headers);
  let SID: string | null = cookies.SIZEBAY_SESSION_ID_V4;
  let showButtons: string | null = null;
  let buttonsUrl: (mode: string) => string = (_a: string) => "a";
  let permaLink = "";
  let recommendedSize: string | null = null;

  if (props.page?.product.url?.includes("http://localhost:8000/")) {
    // to work in local
    permaLink = props.page?.product.url?.replace(
      "http://localhost:8000",
      "https://www.carolbassi.com.br",
    ).split("?")[0];
  } else if (
    props.page?.product.url?.includes("https://decocarolbassi.deco.site/")
  ) {
    permaLink = props.page?.product.url?.replace(
      "https://decocarolbassi.deco.site",
      "https://www.carolbassi.com.br",
    ).split("?")[0];
  } else {
    permaLink = props.page?.product.url!;
  }

  try {
    if (!SID) {
      const response = await fetch(
        `https://vfr-v3-production.sizebay.technology/api/me/session-id`,
      ).then((r) => r.json())
        .catch((e) => {
          console.error(e);
        });

      SID = response ? (response as string) : null;

      setCookie(ctx.response.headers, {
        value: SID ?? "",
        name: "SIZEBAY_SESSION_ID_V4",
        path: "/",
        secure: true,
        httpOnly: true,
      });
    }

    const sizebayProductURL =
      `https://vfr-v3-production.sizebay.technology/plugin/my-product-id?sid=${SID}&permalink=${permaLink}`;

    const sizebayProduct: any = await fetch(
      sizebayProductURL,
    ).then((r) => r.json())
      .catch((e) => {
        console.error(e);
      });

    if (sizebayProduct && typeof sizebayProduct !== "string") {
      showButtons = sizebayProduct.accessory ? "accessory" : "noAccessory";

      const response: any = await fetch(
        `https://vfr-v3-production.sizebay.technology/api/me/analysis/${sizebayProduct.id}?sid=${SID}&tenant=664`,
      ).then((r) => r.json())
        .catch((e) => {
          console.error(e);
        });

      if (response.recommendedSize) {
        recommendedSize = response.recommendedSize;
      }
    }

    buttonsUrl = (mode: string) =>
      `https://vfr-v3-production.sizebay.technology/V4/?mode=${mode}&id=${sizebayProduct.id}&sid=${SID}&tenantId=664&watchOpeningEvents=true&lang=pt`;
  } catch (e) {
    console.error(e);
  }

  return {
    ...props,
    device: ctx.device,
    showButtons,
    buttonsUrl,
    recommendedSize,
    productRecommendations: data?.productRecommendations ?? [],
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
