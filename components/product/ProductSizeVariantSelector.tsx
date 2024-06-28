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
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSizeVariantOfferAvailability } from "../../sdk/useOfferAvailability.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import Button from "../ui/ButtonBanner.tsx";

interface Props {
  product: Product;
  breadcrumb?: BreadcrumbList;
}

function SizeSelector({ product, breadcrumb }: Props) {
  const signalProduct = useSignal<ProductLeaf | null>(null);

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
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            <Button class="w-full" negative>COMPRAR</Button>
            <Button class="w-full">ADICIONAR A SACOLA</Button>
          </div>
        )
        : null}

      {signalProduct.value
        ? (
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
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

function VariantSelector({ product, breadcrumb }: Props) {
  const { url, isVariantOf } = product;

  const productSimilars = product.isSimilarTo?.map((similar) => {
    return {
      url: similar.url ?? "",
      sku: similar.sku ?? "",
      color: similar.additionalProperty?.find((property) =>
        property.name === "Cores"
      )?.value ?? "",
    };
  });

  console.log({ productSimilars });

  const getProductExactColor = isVariantOf?.additionalProperty.find((
    { name },
  ) => name === "Cor exata")?.value;

  console.log({ getProductExactColor });
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  const getActiveValue = (variantName: string) => {
    const variants = possibilities[variantName];
    const relativeUrl = relative(url);
    for (const [value, link] of Object.entries(variants)) {
      if (relative(link) === relativeUrl) {
        return value;
      }
    }
    return null;
  };

  return (
    <ul className="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => {
        const activeValue = getActiveValue(name);
        const variants = Object.entries(possibilities[name]);

        if (name.startsWith("Cores")) {
          return (
            <li
              key={name}
              className="flex flex-col gap-2"
              data-name={activeValue}
            >
              <span className="text-base text-dark-blue uppercase font-light">
                Cor :{" "}
                <span class="text-paragraph-color capitalize">
                  {activeValue}
                </span>
              </span>
              <ul className="flex flex-row gap-3">
                {variants.map(([value, link], index) => {
                  const { sizeOfferIsAvailable } =
                    useSizeVariantOfferAvailability(index, isVariantOf);

                  const relativeUrl = relative(url);
                  const relativeLink = relative(link);
                  return (
                    <li key={value}>
                      <button f-partial={relativeLink} f-client-nav>
                        <Avatar
                          label={name}
                          content={value}
                          variant={!sizeOfferIsAvailable && "disabled" ||
                              sizeOfferIsAvailable &&
                                relativeLink === relativeUrl
                            ? "active"
                            : "default"}
                          productExactColor={getProductExactColor!}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        }

        return <SizeSelector product={product} breadcrumb={breadcrumb} />;
      })}
    </ul>
  );
}

export default VariantSelector;
