import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../../../apps/site.ts";
import { clx } from "../../../../sdk/clx.ts";
import { formatPrice } from "../../../../sdk/format.ts";
import { relative } from "../../../../sdk/url.ts";
import { useOffer } from "../../../../sdk/useOffer.ts";
import { SendEventOnClick } from "../../../Analytics.tsx";
import Slider from "../../../ui/Slider.tsx";

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

function ProductCardSliderImagesMobile({
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

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:hover:border-inherit mb-4"
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
            <Slider class="carousel carousel-center">
              {images?.map(({ url, alternateName }, index) => {
                return (
                  <Slider.Item
                    key={index}
                    className={"carousel-item group first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 min-w-[190px] w-full"}
                    index={index}
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

          <ul
            class={`absolute bottom-0 carousel grid grid-cols-${images
              ?.length!} items-end col-span-full z-10 row-start-4 w-full m-auto bg-secondary-neutral-600`}
          >
            {images?.map((_, index) => (
              <li class="carousel-item w-full">
                <Slider.Dot index={index} class="w-full">
                  <div class="w-full h-[2px] group-disabled:bg-dark-blue bg-transparent" />
                </Slider.Dot>
              </li>
            ))}
          </ul>
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
      <Slider.JS rootId={id} infinite />
    </div>
  );
}

export default ProductCardSliderImagesMobile;
