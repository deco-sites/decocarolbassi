import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import { Platform } from "../../../apps/site.ts";
import ProductCardSliderImages from "../../../islands/ProductCardSliderImages.tsx";
import { CategoryBannersMediaSource } from "../ProductGalleryWithBanner.tsx";

const WIDTH = 613;
const HEIGHT = 930;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export default function ProductCardWithBannerDesktop(
  {
    products,
    categoryBanners,
    offset,
    platform,
    mobileColumns,
    desktopColumns,
  }: {
    products: Product[];
    categoryBanners: CategoryBannersMediaSource;
    offset: number;
    platform: Platform;
    mobileColumns: string;
    desktopColumns: string;
  },
) {
  const productsGrid1 = products.length > 4
    ? products.slice(0, 4)
    : products.slice(0);
  const productsGrid2 = products.length > 8
    ? products.slice(4, 8)
    : products.slice(4);
  const productsGrid3 = products.length > 12
    ? products.slice(8, 12)
    : products.slice(8);
  const productsGrid4 = products.length > 16
    ? products.slice(12, 16)
    : products.slice(12);
  const productsGrid5 = products.length > 20
    ? products.slice(16, 20)
    : products.slice(16);
  const productsGrid6 = products.length > 24
    ? products.slice(20, 24)
    : products.slice(20);

  return (
    <>
      <div class="grid grid-cols-2 gap-8">
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
                  class="w-full h-full object-cover"
                  loading={"lazy"}
                />
              </figure>
            )
            : (
              <Video
                src={categoryBanners.banner1.video!}
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

        <div class="grid grid-cols-2 gap-2 w-full">
          {productsGrid1.map((product, index) => (
            <ProductCardSliderImages
              key={`product-card-${product.productID}`}
              product={product}
              preload={index === 0}
              index={offset + index}
              platform={platform}
            />
          ))}
        </div>
      </div>

      <div
        class={`grid ${mobileColumns} gap-2 items-center ${desktopColumns} sm:gap-2 my-8`}
      >
        {productsGrid2.map((product: Product, index) => (
          <ProductCardSliderImages
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>

      <div
        class={`grid ${mobileColumns} gap-4 items-center grid-cols-2 my-8`}
      >
        <a
          href={categoryBanners.banner2.action?.href}
          class=" w-full h-full object-cover"
        >
          {categoryBanners.banner2.type === "image"
            ? (
              <figure
                style={{ aspectRatio: ASPECT_RATIO }}
                class="w-full h-full"
              >
                <Image
                  src={categoryBanners.banner2.image!}
                  width={WIDTH}
                  height={HEIGHT}
                  class="w-full h-full object-cover"
                  loading={"lazy"}
                />
              </figure>
            )
            : (
              <Video
                src={categoryBanners.banner2.video!}
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
        <div class="grid gap-2 items-center grid-cols-2">
          {productsGrid3.map((product: Product, index) => (
            <ProductCardSliderImages
              key={`product-card-${product.productID}`}
              product={product}
              preload={index === 0}
              index={offset + index}
              platform={platform}
            />
          ))}
        </div>
      </div>

      <div
        class={`grid ${mobileColumns} gap-2 items-center ${desktopColumns} sm:gap-2 my-8`}
      >
        {productsGrid4.map((product: Product, index) => (
          <ProductCardSliderImages
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>

      <div class="grid grid-cols-2 gap-8 mb-8">
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
                  class="w-full h-full object-cover"
                  loading={"lazy"}
                />
              </figure>
            )
            : (
              <Video
                src={categoryBanners.banner3.video!}
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

        <div class="grid grid-cols-2 gap-2 w-full">
          {productsGrid5.map((product, index) => (
            <ProductCardSliderImages
              key={`product-card-${product.productID}`}
              product={product}
              preload={index === 0}
              index={offset + index}
              platform={platform}
            />
          ))}
        </div>
      </div>

      <div
        class={`grid ${mobileColumns} gap-2 items-center ${desktopColumns} sm:gap-2 my-4`}
      >
        {productsGrid6.map((product: Product, index) => (
          <ProductCardSliderImages
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
