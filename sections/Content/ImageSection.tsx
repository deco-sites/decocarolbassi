import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  title: string;
  /**
   * @format textarea
   */
  description: string;
  image: ImageWidget;
  placement: "left" | "right";
  cta?: {
    href?: string;
    text?: string;
  };
  disableSpacing?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const PLACEMENT = {
  left: "flex-col lg:flex-row-reverse",
  right: "flex-col lg:flex-row",
};

const DEFAULT_IMAGE =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97";

export default function ImageSection({
  title,
  description,
  image = DEFAULT_IMAGE,
  placement,
  disableSpacing,
  cta,
}: Props) {
  return (
    <div class="w-full">
      <div
        class={`flex items-center lg:max-w-7xl lg:mx-auto mx-8 md:mx-10 ${
          PLACEMENT[placement]
        } gap-12 md:gap-20 text-left items-center z-10 ${
          disableSpacing?.top ? "" : "pt-12 lg:pt-28"
        } ${disableSpacing?.bottom ? "" : "pb-12 lg:pb-28"}`}
      >
        <Image
          width={908}
          height={681}
          class="w-full object-fit z-10"
          sizes="(max-width: 908px) 100vw, 30vw"
          src={image}
          alt={image}
          decoding="async"
          loading="lazy"
        />
        <div class="w-full lg:w-1/2 space-y-2 lg:space-y-4 lg:max-w-xl gap-4 z-10">
          <p class="text-2xl text-center lg:text-left lg:text-[40px] leading-[110%] font-normal uppercase text-dark-blue">
            {title}
          </p>
          <p class="text-center lg:text-left font-light text-[16px] md:text-[18px] leading-[150%] text-[#4B5565] lg:text-[18px] ">
            {description}
          </p>
          {cta?.href && cta?.text && (
            <a
              class="pt-4 flex gap-2 border-none text-secondary transition-colors duration-200 cursor-pointer"
              href={cta.href}
            >
              <span>{cta.text}</span>
              <Icon
                id="ChevronRight"
                width={24}
                height={24}
                strokeWidth={"2"}
                class="text-secondary"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
