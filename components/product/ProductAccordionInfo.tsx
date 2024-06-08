import { useSignal } from "@preact/signals";
import Icon from "../ui/Icon.tsx";

export interface Props {
  title: string;
  /**
   * @format textarea
   */
  description?: string | string[];
}

function AccordionProductInfo({ title, description }: Props) {
  const isOpen = useSignal<boolean>(false);

  return (
    <div class="w-full mb-6 first:mt-14">
      <button
        class="flex justify-between w-full"
        onClick={() => isOpen.value = !isOpen.value}
      >
        <h3 class="uppercase font-light text-dark-blue">{title}</h3>
        {isOpen.value
          ? <Icon id="ArrowDown" class="rotate-180" size={24} />
          : <Icon id="ArrowDown" size={24} />}
      </button>

      {isOpen.value && (
        <div
          class={`font-light text-paragraph-color mt-2 fade-in ${
            isOpen ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {Array.isArray(description)
            ? (
              description.map((line, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
              ))
            )
            : <p dangerouslySetInnerHTML={{ __html: description ?? "" }} />}
        </div>
      )}
    </div>
  );
}

export default AccordionProductInfo;
