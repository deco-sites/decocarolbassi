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
  "Jeans-claro": "bg-[#89adc1] ",
  "Jeans-escuro": "bg-[#343f51] ",
  "Jeans-medio": "bg-[#2b4f70] ",
  "Laranja": "bg-[#ff8c00] ",
  "Lilás": "bg-[#c388ff] ",
  "Lima": "bg-[#d2e288] ",
  "Madrepérola": "bg-[#f8e2b9] ",
  "Marinho": "bg-[#120a8f]",
  "Marrom": "bg-[#8b4513]",
  "Nude": "bg-[#e2ccd3]",
  "Off-white": "bg-[#fefced]",
  "Ouro": "bg-[#c79437]",
  "Prata": "bg-[#c0c0ba]",
  "Preto": "bg-[#000000]",
  "Rosa": "bg-[#ff0080]",
  "Roxo": "bg-[#993399]",
  "Telha": "bg-[#c86355]",
  "Verde": "bg-[#00913f]",
  "Vermelho": "bg-[#ff0000]",
  "Vinho": "bg-[#844955]",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  label?: string;
}

const colorVariantsClasses = {
  active:
    "text-base-content rounded border-solid border-[1px] border-[#e9e9e9]",
  disabled: "line-through text-neutral-content",
  default:
    "text-base-content bg-base-100 rounded border-solid border-[1px] border-[#e9e9e9]",
};

function ColorAvatarFilter({ content, variant = "default" }: Props) {
  return (
    <div
      class={`avatar placeholder text-base font-light h-4 ${
        colors[content] && colorVariantsClasses[variant]
      }`}
    >
      <div
        class={`${
          colors[content] ??
            "border-solid border-[1px] border-[#e9e9e9] rounded"
        } rounded`}
      >
      </div>
    </div>
  );
}

export default ColorAvatarFilter;