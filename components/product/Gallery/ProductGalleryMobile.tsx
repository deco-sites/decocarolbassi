import { Product } from "apps/commerce/types.ts";
import { Platform } from "../../../apps/site.ts";
import { useUI } from "../../../sdk/useUI.ts";
import ProductCardSliderImagesMobile from "../Gallery/ProductCardSliderImages/ProductCardSliderImagesMobile.tsx";

export interface Props {
  products: Product[];
  offset: number;
  platform: Platform;
}

export default function ProductGalleryMobile(
  {
    products,
    offset,
    platform,
  }: Props,
) {
  const { displayGridLayout } = useUI();

  return (
    <div class="grid grid-cols-1 gap-8">
      <div class={`grid grid-cols-${displayGridLayout.value} gap-2 w-full`}>
        {products.map((product, index) => (
          <ProductCardSliderImagesMobile
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            platform={platform}
          />
        ))}
      </div>
    </div>
  );
}
