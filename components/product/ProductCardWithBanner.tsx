import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import { Platform } from "../../apps/site.ts";
import ProductCardSliderImages from "../../islands/ProductCardSliderImages.tsx";
import ProductCard from "./ProductCard.tsx";
import { MediaSource } from "./ProductGallery.tsx";

const ASPECT_RATIO = `613 / 930`;

export default function ProductCardWithBanner(
  { products, mediaSources, offset, platform, mobileColumns, desktopColumns }: {
    products: Product[];
    mediaSources: MediaSource;
    offset: number;
    platform: Platform;
    mobileColumns: string;
    desktopColumns: string;
  },
) {
  const productsGrid1 = products.length > 4 ? products.slice(0, 4) : [];
  const productsGrid2 = products.length > 8 ? products.slice(4, 8) : [];
  const productsGrid3 = products.length > 10 ? products.slice(8, 10) : [];

  return (
    <>
      <div class="grid grid-cols-2 gap-8">
        <a href={mediaSources[0].action?.href}>
          {mediaSources[0].type === "image"
            ? (
              <figure style={{ ASPECT_RATIO }} class="w-full h-full">
                <Image
                  src={mediaSources[0].image!}
                  width={613}
                  height={930}
                  class="w-full h-full"
                />
              </figure>
            )
            : (
              <Video
                src={mediaSources[0].video!}
                width={600}
                height={930}
                style={{ ASPECT_RATIO }}
                class="w-full h-full"
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
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>

      <div
        class={`grid ${mobileColumns} gap-2 items-center ${desktopColumns} sm:gap-2 my-8`}
      >
        {productsGrid2.map((product: Product, index) => (
          <ProductCard
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
