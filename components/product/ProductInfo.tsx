import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import AddToCartButtonLinx from "../../islands/AddToCartButton/linx.tsx";
import AddToCartButtonNuvemshop from "../../islands/AddToCartButton/nuvemshop.tsx";
import AddToCartButtonShopify from "../../islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "../../islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "../../islands/AddToCartButton/wake.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ProductAccordionInfo from "../../islands/ProductAccordionInfo.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePercentualDiscount } from "../../sdk/usePercentualPrice.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductPolicy } from "../../sections/Product/ProductDetails.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";

export interface Props {
  page: ProductDetailsPage | null;
  productExchangesReturnsPolicy?: ProductPolicy;
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, productExchangesReturnsPolicy }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const productName = product.isVariantOf?.name;
  const productSpecification = product.isVariantOf?.additionalProperty.find((
    spec,
  ) => spec.name === "Especificação")?.value?.split("\r\n");
  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const hasDiscount = (listPrice ?? 0) > (price ?? 0);
  const productPercentualOff = hasDiscount &&
    usePercentualDiscount(listPrice!, price!);

  return (
    <div class="flex flex-col px-4 max-w-[420px] w-full" id={id}>
      {/* Code and name */}
      <div class="border-secondary-neutral-200 border-solid border-b">
        <div>
          <div class="w-full flex justify-end">
            <WishlistButtonVtex
              variant="icon"
              productID={productID}
              productGroupID={productGroupID}
              class="w-auto"
            />
          </div>
          <div>
            {gtin && <span class="text-sm text-base-300">Cod. {gtin}</span>}
          </div>
          <h1>
            <span class="font-medium text-xl capitalize">
              {productName}
            </span>
          </h1>
        </div>
        {/* Prices */}
        <div class="mt-4">
          <div class="flex flex-row gap-2 items-center">
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
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={productID}
                seller={seller}
                gotoCheckout
              />
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6 max-w-[373px]">
        <ProductAccordionInfo
          title="descrição do produto"
          description={description}
        />
        <ProductAccordionInfo
          title="características"
          description={productSpecification ?? ""}
        />
        <ProductAccordionInfo
          title={productExchangesReturnsPolicy?.title ?? "trocas e devoluções"}
          description={productExchangesReturnsPolicy?.description ?? ""}
        />
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
