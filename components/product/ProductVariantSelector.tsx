import Avatar from "$store/components/ui/Avatar.tsx";
import SizeSelector from "$store/islands/ProductSizeVariantSelector.tsx";
import { relative } from "$store/sdk/url.ts";
import { useSizeVariantOfferAvailability } from "$store/sdk/useOfferAvailability.ts";
import { useProductField } from "$store/sdk/useProductField.ts";
import { useSimilarColors } from "$store/sdk/useSimilarsColors.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { useSignal } from "@preact/signals";
import type { BreadcrumbList, Product } from "apps/commerce/types.ts";

export interface Props {
  product: Product;
  breadcrumb?: BreadcrumbList;
  sizebay: {
    showButtons: string | null;
    urlChart: string;
    urlVfr: string;
    recommendedSize: string | null;
  };
}

function VariantSelector({ product, breadcrumb, sizebay }: Props) {
  const { url, isVariantOf, isSimilarTo } = product;
  const productVariant = useSignal<Product | undefined>(product);
  const selectedProduct = productVariant.value;
  const similarsColors = useSimilarColors(isSimilarTo);

  const getProductExactColor = useProductField(product, "Cor exata");

  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  const getActiveValue = (variantName: string) => {
    const variants = possibilities[variantName];
    const relativeUrl = url && relative(url);
    for (const [value, link] of Object.entries(variants)) {
      if (link && relative(link) === relativeUrl) {
        return value;
      }
    }
    return null;
  };

  return (
    <>
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
                    console.log({ sizeOfferIsAvailable });

                    const relativeUrl = url && relative(url);
                    const relativeLink = link && relative(link);
                    return (
                      <li key={value}>
                        <button f-partial={relativeLink} f-client-nav>
                          <Avatar
                            label={name}
                            content={value}
                            variant={
                              (!sizeOfferIsAvailable && "disabled") ||
                              (sizeOfferIsAvailable &&
                                relativeLink === relativeUrl)
                                ? "active"
                                : "default"
                            }
                            productExactColor={getProductExactColor!}
                          />
                        </button>
                      </li>
                    );
                  })}

                  {similarsColors?.map((item, index) => {
                    const { sizeOfferIsAvailable } =
                      useSizeVariantOfferAvailability(index, isVariantOf);

                    const relativeUrl = url && relative(url);
                    const relativeLink = relative(item.url);

                    return (
                      <li key={item.color}>
                        <button f-partial={relativeLink} f-client-nav>
                          <Avatar
                            label={name}
                            content={item.color}
                            variant={
                              !sizeOfferIsAvailable
                                ? "disabled" || relativeLink !== relativeUrl
                                : "default"
                            }
                            productExactColor={item.specificColor!}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
        })}
      </ul>
      <SizeSelector
        product={selectedProduct!}
        breadcrumb={breadcrumb}
        sizebay={sizebay}
      />
    </>
  );
}

export default VariantSelector;

