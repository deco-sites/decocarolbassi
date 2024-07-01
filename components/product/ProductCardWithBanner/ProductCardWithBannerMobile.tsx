import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import { Platform } from "../../../apps/site.ts";
import { useUI } from "../../../sdk/useUI.ts";
import ProductCardSliderImagesMobile from "../Gallery/ProductCardSliderImages/ProductCardSliderImagesMobile.tsx";
import { CategoryBannersMediaSource } from "../ProductGalleryWithBanner.tsx";

const WIDTH = 613;
const HEIGHT = 930;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export interface Props {
  products: Product[];
  categoryBanners: CategoryBannersMediaSource;
  offset: number;
  platform: Platform;
  mobileColumns: string;
  desktopColumns: string;
}

export default function ProductCardWithBannerMobile(
  {
    products,
    categoryBanners,
    offset,
    platform,
    mobileColumns,
    desktopColumns,
  }: Props,
) {
  const productsGrid1 = products.length > 4 ? products.slice(0, 4) : [];
  const productsGrid2 = products.length > 8 ? products.slice(4, 8) : [];
  const productsGrid3 = products.length > 10 ? products.slice(8, 10) : [];
  const productsGrid4 = products.length > 14 ? products.slice(10, 14) : [];
  const productsGrid5 = products.length > 18 ? products.slice(14, 18) : [];
  const productsGrid6 = products.length > 22 ? products.slice(18, 22) : [];
  const { displayGridLayout } = useUI();

  return (
    <>
      <div class="grid grid-cols-1 gap-8">
        <div class={`grid grid-cols-${displayGridLayout.value} gap-2 w-full`}>
          {productsGrid1.map((product, index) => (
            <ProductCardSliderImagesMobile
              key={`product-card-${product.productID}`}
              product={product}
              preload={index === 0}
              index={offset + index}
              platform={platform}
            />
          ))}
        </div>

        <a href={categoryBanners.banner1.action?.href}>
          {categoryBanners.banner1.type === "image"
            ? (
              <figure
                style={{ aspectRatio: ASPECT_RATIO }}
                class="w-full h-full"
              >
                <Image
                  src={categoryBanners.banner1.image!}
                  width={WIDTH}
                  height={HEIGHT}
                  class="w-full h-full"
                />
              </figure>
            )
            : (
              <Video
                src={categoryBanners.banner1.video!}
                style={{ aspectRatio: ASPECT_RATIO }}
                width={WIDTH}
                height={HEIGHT}
                controls={false}
                autoPlay
                loop
                muted
                class="w-full h-full object-cover"
              />
            )}
        </a>
      </div>

      <div
        class={`grid grid-cols-${displayGridLayout.value} gap-2 items-center ${desktopColumns} sm:gap-2 my-8`}
      >
        {productsGrid2.map((product: Product, index) => (
          <ProductCardSliderImagesMobile
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>

      <div
        class={`grid gap-4 items-center grid-cols-1 my-8`}
      >
        <div class={`grid grid-cols-${displayGridLayout.value} gap-2 w-full`}>
          {productsGrid3.map((product: Product, index) => (
            <ProductCardSliderImagesMobile
              key={`product-card-${product.productID}`}
              product={product}
              preload={index === 0}
              index={offset + index}
              platform={platform}
            />
          ))}
        </div>

        <a
          href={categoryBanners.banner2.action?.href}
          class="w-full h-full object-cover"
        >
          {categoryBanners.banner2.type === "image"
            ? (
              <Image
                src={categoryBanners.banner2.image!}
                width={WIDTH}
                height={HEIGHT}
                class="w-full h-full object-cover"
              />
            )
            : (
              <Video
                src={categoryBanners.banner2.video!}
                style={{ aspectRatio: ASPECT_RATIO }}
                width={WIDTH}
                height={HEIGHT}
                controls={false}
                autoPlay
                loop
                muted
                class="w-full h-full object-cover"
              />
            )}
        </a>
      </div>

      <div
        class={`grid grid-cols-${displayGridLayout.value} gap-2 items-center ${desktopColumns} sm:gap-2 my-8`}
      >
        {productsGrid4.map((product: Product, index) => (
          <ProductCardSliderImagesMobile
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>

      <div class="grid grid-cols-1 gap-8 mb-8">
        <div class={`grid grid-cols-${displayGridLayout.value} gap-2 w-full`}>
          {productsGrid5.map((product, index) => (
            <ProductCardSliderImagesMobile
              key={`product-card-${product.productID}`}
              product={product}
              preload={index === 0}
              index={offset + index}
              platform={platform}
            />
          ))}
        </div>
        <a href={categoryBanners.banner3.action?.href}>
          {categoryBanners.banner3.type === "image"
            ? (
              <figure
                style={{ aspectRatio: ASPECT_RATIO }}
                class="w-full h-full"
              >
                <Image
                  src={categoryBanners.banner3.image!}
                  width={WIDTH}
                  height={HEIGHT}
                  class="w-full h-full"
                />
              </figure>
            )
            : (
              <Video
                src={categoryBanners.banner3.video!}
                style={{ aspectRatio: ASPECT_RATIO }}
                width={WIDTH}
                height={HEIGHT}
                controls={false}
                autoPlay
                loop
                muted
                class="w-full h-full object-cover"
              />
            )}
        </a>
      </div>

      <div
        class={`grid grid-cols-${displayGridLayout.value} gap-2 items-center ${desktopColumns} sm:gap-2 my-4`}
      >
        {productsGrid6.map((product: Product, index) => (
          <ProductCardSliderImagesMobile
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>
    </>
  );
}
