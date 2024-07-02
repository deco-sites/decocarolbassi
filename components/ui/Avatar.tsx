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
  "Lilas": "bg-[#c388ff]",
  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled": "line-through text-neutral-content",
  "default": "text-base-content bg-base-100",
};

const imageColors: Record<string, string> = {
  "Estampado":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/08e7d686-09f5-4952-bcd8-cc88b8c3b45d",
  "Floral":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/3c39fe50-ab8c-4744-8745-b60b29fe8303",
  "Colorido":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/0f45b090-73cf-4cac-8cb3-20e89514ecc9",
  "Xadrez":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/8179d00d-9d95-46a0-8f5a-c634a7508eda",
  "Onca":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/db436dac-0977-4d75-bb54-ce02e6118feb",
  "Madrepérola":
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/69c9faf4-2572-4288-be8a-f55a78e345fa",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  label?: string;
  class?: string;
  productExactColor?: string;
}

const colorVariantsClasses = {
  active:
    "text-base-content rounded-full border-solid border-[1px] border-primary-500 p-[3px] h-8",
  disabled: "line-through text-neutral-content h-7",
  default:
    "text-base-content bg-base-100 border border-solid border-[#3B3B3B] rounded-full h-7",
};

const sizeVariantsClasses: Record<string, string> = {
  active: "text-base-content border-solid border-primary-600 border",
  disabled: "text-[#C9CACB] line-through",
  default: "text-base-content bg-base-100",
};

function Avatar(
  { content, variant = "default", label, class: _class, productExactColor }:
    Props,
) {
  const avatarImage = imageColors[content];
  if (avatarImage) {
    return (
      <div
        class={`avatar placeholder text-base font-light h-6 `}
      >
        <div
          class={`${
            imageColors[content]
          } border-solid border-primary-600 border rounded-full`}
        >
          <img src={avatarImage} alt={content} />
        </div>
      </div>
    );
  }

  return label === "Cores"
    ? (
      <div
        class={`avatar placeholder text-base font-light border border-solid border-[#9AA4B2] rounded-full ${
          colors[content] && colorVariantsClasses[variant]
        }`}
      >
        <div
          className={`${colors[content] ?? colors[variant]} rounded-full`}
          style={productExactColor
            ? { backgroundColor: productExactColor }
            : {}}
        >
          <span className="uppercase">
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
