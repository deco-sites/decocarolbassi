import type { ImageObject, Product, VideoObject } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import type { Platform } from "../../../../apps/site.ts";
import { clx } from "../../../../sdk/clx.ts";
import { formatPrice } from "../../../../sdk/format.ts";
import { relative } from "../../../../sdk/url.ts";
import { useOffer } from "../../../../sdk/useOffer.ts";
import { useVariantOfferAvailability } from "../../../../sdk/useOfferAvailability.ts";
import { usePercentualDiscount } from "../../../../sdk/usePercentualPrice.ts";
import { useProductVariantDiscount } from "../../../../sdk/useProductVariantDiscount.ts";
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
  const {
    url,
    productID,
    image: images,
    video: videos,
    isVariantOf,
    additionalProperty,
  } = product;

  const flagNewIn = additionalProperty?.find(({ value }) =>
    value === "Ícones 10 Anos"
  );

  const { productVariantDiscount } = useProductVariantDiscount(product);
  const { offers } = productVariantDiscount;

  const id = `product-card-${productID}`;
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  const productImages = videos && videos.length > 0
    ? images?.slice(0, 2) ?? []
    : images?.slice(0, 3) ?? [];

  const productVideo = videos && videos.length > 0
    ? videos?.slice(0) ?? []
    : [];

  const sourcesMedia: (ImageObject | VideoObject)[] = [
    ...productImages,
    ...productVideo,
  ];

  const { listPrice, price } = useOffer(offers);
  const { hasOfferAvailable } = useVariantOfferAvailability(isVariantOf);

  const hasDiscount = (listPrice ?? 0) > (price ?? 0);

  const productPercentualOff = hasDiscount &&
    usePercentualDiscount(listPrice!, price!);

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
            {!!flagNewIn && (
              <div class="w-fit absolute z-10 p-1 top-2 left-2">
                <h4 class="text-[8px] text-[#00000066] font-medium">
                  ÍCONES 10 ANOS
                </h4>
              </div>
            )}
            <Slider class="carousel">
              {sourcesMedia?.map((source, index) => {
                return source.encodingFormat === "image"
                  ? (
                    <Slider.Item
                      key={index}
                      className={"carousel-item group min-w-[190px] w-full"}
                      index={index}
                    >
                      <Image
                        src={productImages[index].url!}
                        alt={source.alternateName}
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
                  )
                  : (
                    <Slider.Item
                      key={index}
                      className={"carousel-item group min-w-[190px] w-full"}
                      index={index}
                    >
                      <Video
                        src={source.contentUrl!}
                        alt={source.alternateName}
                        width={WIDTH}
                        height={HEIGHT}
                        style={{ aspectRatio }}
                        className={clx(
                          "relative",
                          "bg-base-100",
                          "object-cover",
                          "w-full",
                          "col-span-full row-span-full",
                        )}
                        sizes="(max-width: 640px) 50vw, 20vw"
                        loading={preload ? "eager" : "lazy"}
                        decoding="async"
                        muted
                        autoPlay
                        loop
                        playsinline
                        playsInline
                      />
                    </Slider.Item>
                  );
              })}
            </Slider>
          </a>

          <ul
            class={`absolute bottom-0 carousel grid grid-cols-${sourcesMedia
              ?.length!} items-end col-span-full z-10 row-start-4 w-full m-auto bg-secondary-neutral-600`}
          >
            {sourcesMedia?.map((_, index) => (
              <li class="carousel-item w-full">
                <Slider.Dot index={index} class="w-full">
                  <div class="w-full h-[2px] group-disabled:bg-dark-blue bg-transparent" />
                </Slider.Dot>
              </li>
            ))}
          </ul>
          <Slider.JS rootId={id} infinite />
        </figure>

        {/* Name/Description */}
        <div class="flex flex-col">
          <h2
            class="truncate text-sm font-light text-paragraph-color"
            dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
          />
        </div>

        {/* Price from/to */}
        <div class="flex items-center justify-between text-dark-blue font-light">
          {hasOfferAvailable
            ? (
              <>
                {hasDiscount && (
                  <span class="line-through text-[#9AA4B2] text-[11px]">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </span>
                )}
                <span class="text-xs">
                  {formatPrice(price, offers?.priceCurrency)}
                </span>
                {hasDiscount && (
                  <span class="text-[#9AA4B2] font-bold text-[11px]">
                    {!!productPercentualOff && productPercentualOff}
                  </span>
                )}
              </>
            )
            : <span>Indisponível</span>}
        </div>
      </div>
    </div>
  );
}

export default ProductCardSliderImagesMobile;
