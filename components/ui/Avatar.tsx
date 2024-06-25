/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "Amarelo": "bg-[#f2cb15]",
  "Areia": "bg-[#e3dacd]",
  "Azul": "bg-[#6495ed]",
  "Bege": "bg-[#f5f5dc]",
  "Blush": "bg-[#db5079]",
  "Bordô": "bg-[#800000]",
  "Branco": "bg-[#ffffff]",
  "Camel": "bg-[#bf8a3d]",
  "Chocolate": "bg-[#45322e]",
  "Cinza": "bg-[#929191]",
  "Cobre": "bg-[#8e402a]",
  "Coral": "bg-[#fd7c6e]",
  "Creme": "bg-[#f5e5ca]",
  "Fendi": "bg-[#a6a797]",
  "Jeans": "bg-[#517998] ",
  "Jeans Claro": "bg-[#89adc1] ",
  "Jeans Escuro": "bg-[#343f51] ",
  "Jeans Médio": "bg-[#2b4f70] ",
  "Laranja": "bg-[#ff8c00] ",
  "Lilás": "bg-[#c388ff] ",
  "Lima": "bg-[#d2e288] ",
  "Madrepérola": "bg-[#f8e2b9] ",
  "Marinho": "bg-[#120a8f]",
  "Marrom": "bg-[#8b4513]",
  "Nude": "bg-[#e2ccd3]",
  "Off White": "bg-[#fefced]",
  "Ouro": "bg-[#c79437]",
  "Prata": "bg-[#c0c0ba]",
  "Preto": "bg-[#000000]",
  "Rosa": "bg-[#ff0080]",
  "Roxo": "bg-[#993399]",
  "Telha": "bg-[#c86355]",
  "Verde": "bg-[#00913f]",
  "Vermelho": "bg-[#ff0000]",
  "Vinho": "bg-[#844955]",
  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled": "line-through text-neutral-content",
  "default": "text-base-content bg-base-100",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  label?: string;
  class?: string;
}

const colorVariantsClasses = {
  active:
    "text-base-content rounded-full border-solid border-[1px] border-primary-500 p-[3px]",
  disabled: "line-through text-neutral-content",
  default: "text-base-content bg-base-100",
};

const sizeVariantsClasses: Record<string, string> = {
  active: "text-base-content border-solid border-primary-600 border",
  disabled: "text-[#C9CACB] line-through",
  default: "text-base-content bg-base-100",
};

function Avatar({ content, variant = "default", label, class: _class }: Props) {
  return label === "Cores"
    ? (
      <div
        class={`avatar placeholder text-base font-light h-8 ${
          colors[content] && colorVariantsClasses[variant]
        }`}
      >
        <div
          class={`${colors[content] ?? colors[variant]} rounded-full`}
        >
          <span class="uppercase">
            {colors[content] ? "" : content.substring(0, 2)}
          </span>
        </div>
      </div>
    )
    : (
      <div class="avatar placeholder text-base font-light h-8">
        <div
          class={`${sizeVariantsClasses[variant]} ${_class}`}
        >
          <span class="uppercase font-medium">
            {sizeVariantsClasses[content] ? "" : content.substring(0, 2)}
          </span>
        </div>
      </div>
    );
}

export default Avatar;
