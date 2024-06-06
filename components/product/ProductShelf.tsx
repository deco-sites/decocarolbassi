import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SectionProps } from "deco/types.ts";
import { AppContext } from "../../apps/site.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import ButtonBanner from "../ui/ButtonBanner.tsx";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
    showDots?: boolean;
    colletionButton?: {
      show?: boolean;
      action?: {
        text: string;
        href: string;
      };
    };
  };
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  url,
}: SectionProps<typeof loader>) {
  const id = useId();
  const platform = usePlatform();
  const isProductPage = url.searchParams.has("skuId");
  console.log(isProductPage);

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-[28%]",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-[90%]",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div class={"w-full py-8 flex flex-col gap-6 lg:py-10"}>
      <div class="ml-8">
        <Header
          title={title || ""}
          description={description || ""}
          fontSize={layout?.headerfontSize || "Large"}
          alignment={layout?.headerAlignment || "center"}
        />
      </div>

      <div
        id={id}
        class={clx(
          "relative grid",
          layout?.showArrows &&
            "grid-cols-[0px_1fr_0px] lg:grid-cols-[0px_1fr_0px]",
          "px-0 ml-8",
        )}
      >
        <Slider class="relative carousel carousel-center col-start-2 col-end-2 row-start-1 row-end-4 gap-1">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <ProductCard
                product={product}
                itemListName={title}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && !layout?.colletionButton?.show && (
          <div class="absolute bottom-[-20px] lg:bottom-0 right-20 w-full lg:w-[250px]">
            <div class="relative left-[70px] lg:left-auto block z-10">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center top-3 lg:top-[27px]">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={0.01}
                  class="w-5"
                />
              </Slider.PrevButton>
            </div>

            <ul
              class={`absolute left-[130px] lg:left-[50px] carousel grid grid-cols-${products.length} mt-[35px] lg:mt-[50px] items-end col-span-full z-10 row-start-4 w-[calc(100%-110px)] lg:w-[200px] m-auto bg-secondary-neutral-600`}
            >
              {products?.map((_, index) => (
                <li class="carousel-item w-full">
                  <Slider.Dot index={index} class="w-full">
                    <div class="w-full h-[0.15rem] group-disabled:bg-dark-blue bg-transparent" />
                  </Slider.Dot>
                </li>
              ))}
            </ul>

            <div class="absolute right-[-20px] lg:right-0 block z-10">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center top-3 lg:top-[27px]">
                <Icon size={24} id="ChevronRight" strokeWidth={0.01} />
              </Slider.NextButton>
            </div>
          </div>
        )}

        {layout?.showArrows && layout?.colletionButton?.show && (
          <>
            <div class="relative block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center top-3 lg:top-[27px]">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={0.01}
                  class="w-5"
                />
              </Slider.PrevButton>
            </div>
            <div class="absolute col-start-3 right-20 lg:col-start-auto lg:left-[255px] lg:right-auto top-3 lg:top-[26px] block z-10 row-start-3">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronRight" strokeWidth={0.01} />
              </Slider.NextButton>
            </div>
          </>
        )}
        {layout?.showDots && layout?.colletionButton?.show && (
          <ul
            class={`absolute left-[50px] carousel grid grid-cols-${products.length} mt-[35px] lg:mt-[50px] items-end col-span-full z-10 row-start-4 w-[calc(100%-130px)] lg:w-[200px] m-auto bg-secondary-neutral-600`}
          >
            {products?.map((_, index) => (
              <li class="carousel-item w-full">
                <Slider.Dot index={index} class="w-full">
                  <div class="w-full h-[0.15rem] group-disabled:bg-dark-blue bg-transparent" />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        )}

        {layout?.colletionButton?.show && (
          <div class="absolute left-24 bottom-[-120px] lg:right-12 lg:left-auto lg:bottom-[-80px]">
            <a
              href={layout?.colletionButton.action?.href}
            >
              <ButtonBanner aria-label={layout.colletionButton.action?.text}>
                {layout?.colletionButton.action?.text}
              </ButtonBanner>
            </a>
          </div>
        )}

        <Slider.JS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export const loader = (props: Props, req: Request, _ctx: AppContext) => {
  const url = new URL(req.url);
  return {
    ...props,
    url,
  };
};

export default ProductShelf;
