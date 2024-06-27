import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePercentualDiscount } from "../../sdk/usePercentualPrice.ts";

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

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
}: Props) {
  const { url, productID, image: images, offers, isVariantOf } = product;

  const id = `product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  const hasDiscount = (listPrice ?? 0) > (price ?? 0);
  const productPercentualOff = hasDiscount &&
    usePercentualDiscount(listPrice!, price!);

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

      <div class="flex flex-col">
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
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
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
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              style={{ aspectRatio }}
              class={clx(
                "bg-base-100",
                "object-cover",
                "w-full",
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
            class="truncate text-base lg:text-base font-light text-paragraph-color mt-[13px]"
            dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
          />
        </div>

        {/* Price from/to */}
        <div class="flex gap-2 items-center justify-start text-dark-blue font-light mt-[4px]">
          <>
            {hasDiscount && (
              <span class="line-through text-sm text-[#9AA4B2]">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="font-light text-dark-blue">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
            {hasDiscount && (
              <span class="text-sm text-[#9AA4B2] font-bold">
                {!!productPercentualOff && productPercentualOff}
              </span>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
