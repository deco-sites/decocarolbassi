import { SectionProps } from "deco/types.ts";
import { AppContext } from "../apps/site.ts";
import Icon from "../components/ui/Icon.tsx";
import { useId } from "../sdk/useId.ts";

export interface Benefit {
  icon: "BenefitShoppingCart" | "BenefitCreditCard" | "BenefitShipping";
  title: string;
  /** @format html */
  description: string;
}

const defaultValues: Benefit[] = [
  {
    icon: "BenefitShoppingCart",
    title: "1° Compra",
    description:
      "Ganhe 10% OFF na sua primeira compra no site. Já aplicado no carrinho",
  },

  {
    icon: "BenefitShoppingCart",
    title: "1° Compra",
    description:
      "Ganhe 10% OFF na sua primeira compra no site. Já aplicado no carrinho",
  },

  {
    icon: "BenefitShoppingCart",
    title: "1° Compra",
    description:
      "Ganhe 10% OFF na sua primeira compra no site. Já aplicado no carrinho",
  },
];

export interface Props {
  items: Benefit[];
}

export const loader = (props: Props, req: Request, _ctx: AppContext) => {
  const url = new URL(req.url);
  return {
    ...props,
    url,
  };
};

export default function Benefits(
  { url, items = defaultValues }: SectionProps<typeof loader>,
) {
  const id = useId();
  const isProductPage = url.searchParams.has("skuId");

  return (
    <div
      id={id}
      class={`lg:container mx-6 lg:mx-auto lg:mb-20 grid gap-8 lg:gap-4 grid-cols-1 place-items-center lg:grid-cols-3 text-center px-4 ${
        isProductPage ? "mt-28 lg:mt-28 mb-11" : "mb-11 mt-[55px]"
      }`}
    >
      {items.map((item) => (
        <div class="flex flex-col items-center justify-center max-w-72">
          <Icon id={item.icon} size={40} strokeWidth={0.01} />
          <h3 class="text-2xl my-1 text-primary-900 uppercase font-normal">
            {item.title}
          </h3>
          <p
            class=" text-primary-900 font-light"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      ))}
    </div>
  );
}
