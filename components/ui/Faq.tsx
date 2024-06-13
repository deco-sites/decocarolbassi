import { useSignal } from "@preact/signals";
import { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "./Icon.tsx";

type FaqProps = {
  faqTitle: string;
  faqDescription: HTMLWidget;
};

export default function Faq(faq: FaqProps) {
  const open = useSignal<boolean>(false);

  return (
    <div class="my-4">
      <button
        type={"button"}
        class="flex font-light justify-between items-center text-dark-blue uppercase  text-sm md:text-base w-full cursor-pointer text-left"
        onClick={() => open.value = !open.value}
      >
        {faq.faqTitle}
        {!open.value
          ? <Icon id="ArrowDown" size={26} />
          : <Icon id="ArrowDown" size={26} class={"rotate-180"} />}
      </button>

      {open.value && (
        <div class="text-sm">
          <p dangerouslySetInnerHTML={{ __html: faq.faqDescription }} />
        </div>
      )}
    </div>
  );
}
