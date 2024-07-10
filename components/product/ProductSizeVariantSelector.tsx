import { useSignal } from "@preact/signals";
import type {
  BreadcrumbList,
  Product,
  ProductLeaf,
} from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ProductSizebayButtons from "../../islands/ProductSizebayButtons.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSizeVariantOfferAvailability } from "../../sdk/useOfferAvailability.ts";
import Button from "../ui/ButtonBanner.tsx";

interface Props {
  product: Product;
  breadcrumb?: BreadcrumbList;
  sizebay: {
    showButtons: string | null;
    urlChart: string;
    urlVfr: string;
    recommendedSize: string | null;
  };
}

function SizeSelector({ product, breadcrumb, sizebay }: Props) {
  const signalProduct = useSignal<ProductLeaf | null>(null);
  const errorMessage = useSignal<boolean>(false);

  const selectedProduct = signalProduct.value ? signalProduct.value : product;

  const hasProductSelected = !!signalProduct.value;
  const { isVariantOf } = product;
  const { offers } = selectedProduct;

  const {
    seller = "1",
    availability,
    price,
    listPrice,
  } = useOffer(offers);

  const variants = isVariantOf?.hasVariant;

  const handleClick = (variant: ProductLeaf) => {
    signalProduct.value = variant;
  };

  const eventItem = mapProductToAnalyticsItem({
    product: selectedProduct,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <>
      <span className="text-base text-dark-blue uppercase font-light">
        Tamanho: {signalProduct?.value?.name}
      </span>

      <ProductSizebayButtons
        {...sizebay}
      />

      <ul class="flex flex-row gap-3">
        {variants?.map((variant, index) => {
          const { sizeOfferIsAvailable } = useSizeVariantOfferAvailability(
            index,
            isVariantOf,
          );

          return (
            <li>
              <button
                onClick={() => handleClick(variant)}
              >
                <div>
                  <Avatar
                    content={variant.name!}
                    class={variant.name === signalProduct?.value?.name &&
                        !sizeOfferIsAvailable
                      ? "border-solid border-primary-600 border"
                      : ""}
                    variant={!sizeOfferIsAvailable
                      ? "disabled"
                      : sizeOfferIsAvailable &&
                          variant.name === signalProduct?.value?.name
                      ? "active"
                      : "default"}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!hasProductSelected
        ? (
          <div class="mt-6 sm:mt-10 flex flex-col gap-2 relative">
            <span
              class={errorMessage.value
                ? "text-sm sm:text-base block text-error-medium absolute -top-7"
                : "hidden"}
            >
              Selecione um Tamanho para continuar!
            </span>
            <Button
              class="w-full hover:bg-primary-700 hover:text-secondary-neutral-100"
              negative
              onClick={() => errorMessage.value = true}
            >
              COMPRAR
            </Button>
            <Button
              class="w-full hover:bg-primary-700"
              onClick={() => errorMessage.value = true}
            >
              ADICIONAR A SACOLA
            </Button>
          </div>
        )
        : null}

      {signalProduct.value
        ? (
          <div class="mt-6 sm:mt-10 flex flex-col gap-2">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={signalProduct.value?.productID!}
                    seller={seller}
                    gotoCheckout
                  />
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={signalProduct.value?.productID!}
                    seller={seller}
                  />
                </>
              )
              : <OutOfStock productID={signalProduct.value?.productID!} />}
          </div>
        )
        : null}
    </>
  );
}

export default SizeSelector;
