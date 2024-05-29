import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 70;
const HEIGHT = 100;

function ProductCardHeader({
  product,
  preload,
  itemListName,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  return (
    <div
      id={id}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:hover:border-inherit lg:p-1"
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
      <a href={relativeUrl} aria-label="view product">
        <div class="flex items-center gap-2">
          <figure
            class="relative overflow-hidden w-[70px] h-[100px]"
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
              <Image
                src={front.url!}
                alt={front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-base-100",
                  "object-contain",
                  "col-span-full row-span-full",
                )}
                sizes="(max-width: 640px) 50vw, 20vw"
                loading={preload ? "eager" : "lazy"}
                decoding="async"
              />
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-base-100",
                  "object-contain",
                  "col-span-full row-span-full",
                  "transition-opacity opacity-0 lg:group-hover:opacity-100",
                )}
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            </a>
          </figure>

          {/* Name/Description */}
          <div class="flex flex-col">
            <h2
              class="truncate text-base capitalize font-light"
              dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
            />
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCardHeader;
