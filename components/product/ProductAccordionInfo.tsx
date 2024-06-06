import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  title: string;
  description?: string;
  isOpen?: boolean;
}

function AccordionProductInfo({ title, description, isOpen = false }: Props) {
  return (
    <div class="w-full">
      <button
        class="flex justify-between"
        {...usePartialSection({ props: { isOpen: !isOpen } })}
      >
        <h3 class="uppercase font-light">{title}</h3>
        {isOpen
          ? <Icon id="ArrowDown" class="rotate-180" size={24} />
          : <Icon id="ArrowDown" size={24} />}
      </button>

      {isOpen && <p>{description}</p>}
    </div>
  );
}

export default AccordionProductInfo;
