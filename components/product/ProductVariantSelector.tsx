import type { Product } from "apps/commerce/types.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { relative } from "../../sdk/url.ts";
import { useSizeVariantOfferAvailability } from "../../sdk/useOfferAvailability.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;

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

        return (
          <li key={name} className="flex flex-col gap-2">
            <span className="text-base text-dark-blue uppercase font-light">
              {name}
            </span>
            <ul className="flex flex-row gap-3">
              {variants.map(([value, link], index) => {
                const relativeUrl = relative(url);
                const relativeLink = relative(link);
                const { sizeOfferIsAvailable } =
                  useSizeVariantOfferAvailability(index, isVariantOf);
                return (
                  <li key={value}>
                    <button f-partial={relativeLink} f-client-nav>
                      <Avatar
                        content={value}
                        variant={!sizeOfferIsAvailable
                          ? "disabled"
                          : relativeLink === relativeUrl
                          ? "active"
                          : "default"}
                        class={relativeLink === relativeUrl &&
                            !sizeOfferIsAvailable
                          ? "border-solid border-primary-600 border"
                          : ""}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default VariantSelector;
