/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "Preto": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",
  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled": "line-through text-neutral-content",
  "default": "text-base-content bg-base-100",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  label?: string;
}

const colorVariantsClasses = {
  active:
    "text-base-content ring-1 ring-black rounded-full border-solid border-[#e9e9e9] border-[3px]",
  disabled: "line-through text-neutral-content",
  default: "text-base-content bg-base-100",
};

const sizeVariantsClasses: Record<string, string> = {
  active: "text-base-content  border-solid border-primary-600 border",
  disabled: "text-[#C9CACB]",
  default: "text-base-content bg-base-100",
};

function Avatar({ content, variant = "default", label }: Props) {
  return label === "Cores"
    ? (
      <div class="avatar placeholder text-base font-light h-6">
        <div
          class={`${colors[content] ?? colors[variant]} ${
            colorVariantsClasses[variant]
          }`}
        >
          <span class="uppercase ">
            {colors[content] ? "" : content.substring(0, 2)}
          </span>
        </div>
      </div>
    )
    : (
      <div class="avatar placeholder text-base font-light h-8">
        <div
          class={`${sizeVariantsClasses[variant]}`}
        >
          <span class="uppercase ">
            {sizeVariantsClasses[content] ? "" : content.substring(0, 2)}
          </span>
        </div>
      </div>
    );
}

export default Avatar;
