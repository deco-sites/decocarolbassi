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
    description: "Ganhe 10% OFF na sua primeira compra no site. Já aplicado no carrinho",
  },

  {
    icon: "BenefitShoppingCart",
    title: "1° Compra",
    description: "Ganhe 10% OFF na sua primeira compra no site. Já aplicado no carrinho",
  },

  {
    icon: "BenefitShoppingCart",
    title: "1° Compra",
    description: "Ganhe 10% OFF na sua primeira compra no site. Já aplicado no carrinho",
  },
]

export interface Props {
  items: Benefit[];
}

export default function Benefits({ items = defaultValues }: Props) {
  const id = useId();
  return (
    <div id={id} class="lg:container mx-6 lg:mx-auto mb-4 lg:my-4 grid gap-8 lg:gap-4 grid-cols-1 place-items-center lg:grid-cols-3 text-center px-4">
      {items.map((item) => (
        <div class="flex flex-col items-center justify-center max-w-72">
          <Icon id={item.icon} size={40} strokeWidth={0.01} />
          <h3 class="text-2xl my-1 text-primary-900 uppercase font-normal">{item.title}</h3>
          <p class=" text-primary-900 font-light" dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      ))}
    </div>
  )
}
