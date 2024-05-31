import { useSignal } from "@preact/signals";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { useEffect } from "preact/hooks";
import type { Platform } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { formatPrice } from "../../../sdk/format.ts";
import { relative } from "../../../sdk/url.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { SendEventOnClick } from "../../Analytics.tsx";
import Slider from "../../ui/Slider.tsx";

export interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCardSliderImages({
  product,
  preload,
  itemListName,
  index,
}: Props) {
  const { url, productID, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const { listPrice, price } = useOffer(offers);
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  const currentIndex = useSignal(1);
  const intervalId = useSignal<number | null>(null);

  const handleMouseOver = () => {
    if (!images) return;
    const id = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    }, 1500);
    intervalId.value = id;
  };

  const handleMouseOut = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId.value !== null) {
        clearInterval(intervalId.value);
      }
    };
  }, []);

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:hover:border-inherit"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="flex flex-col gap-2">
        <figure
          class="relative overflow-hidden"
          style={{ aspectRatio }}
        >
          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(
              "absolute top-0 left-0",
              "grid grid-cols-1 grid-rows-1",
              "w-full",
            )}
          >
            <Slider
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              class="carousel carousel-center"
            >
              {images?.map(({ url, alternateName }, index) => {
                const isActive = index === currentIndex.value;
                return (
                  <Slider.Item
                    key={index}
                    className={"carousel-item group first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 min-w-[190px]"}
                    index={index}
                    style={{ display: isActive ? "block" : "none" }} // Hide inactive images
                  >
                    <Image
                      src={url!}
                      alt={alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      style={{ aspectRatio }}
                      className={clx(
                        "bg-base-100",
                        "object-cover",
                        "w-full",
                        "col-span-full row-span-full",
                      )}
                      sizes="(max-width: 640px) 50vw, 20vw"
                      preload={preload}
                      loading={preload ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </Slider.Item>
                );
              })}
            </Slider>
          </a>
        </figure>

        {/* Name/Description */}
        <div class="flex flex-col">
          <h2
            class="truncate text-base lg:text-base font-light text-paragraph-color ml-4"
            dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
          />
        </div>

        {/* Price from/to */}
        <div class="flex gap-2 items-center justify-start text-dark-blue ml-4 font-light">
          <span>
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
      </div>
      <Slider.JS rootId={id} interval={true && 1 * 1e3} infinite />
    </div>
  );
}

export default ProductCardSliderImages;
