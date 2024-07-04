import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import { SectionProps } from "deco/types.ts";
import { AppContext } from "../../apps/site.ts";
import ButtonBanner from "../../components/ui/ButtonBanner.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface CategoryGridProps {
  href?: string;
  video?: VideoWidget;
  image?: ImageWidget;
  /** @description Alternative text */
  label?: string;
  buttonText?: string;
  negative?: boolean;
}

export interface Props {
  header?: {
    /**
     * @default Explore Our Categories
     */
    title?: string;
    /**
     * @default Your description here
     */
    description?: string;
  };

  /**
   * @title Banners in Row - active to display banners in row
   */
  isBannerRowList?: boolean;
  interval?: number;
  list?: CategoryGridProps[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

const DEFAULT_LIST = [
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
    negative: false,
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
    negative: false,
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
    negative: false,
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
    negative: false,
  },
];

function CategoryGrid(props: SectionProps<typeof loader>) {
  const id = useId();
  const {
    header = {
      title: "Explore Our Categories",
      description: "Your description",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "bottom",
        textAlignment: "left",
      },
    },
    isBannerRowList = false,
    device,
    interval = 0,
  } = props;

  const aspectRatio = 200 / 279;

  return (
    <div
      id={id}
      class={`mb-0 ${
        isBannerRowList ? "lg:px-8 pb-8 mt-12 lg:mt-20" : "mt-36 lg:mt-28"
      } `}
    >
      <div
        class={`${device == "mobile" && "ml-4"}
          ${isBannerRowList && device !== "mobile" && "ml-0"}
          ${!isBannerRowList && "ml-8"}
        `}
      >
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
        />
      </div>

      {isBannerRowList && device === "mobile"
        ? (
          <div
            id={id}
            class={"relative grid grid-cols-[0px_1fr_0px] sm:grid-cols-[48px_1fr_48px] mt-6"}
          >
            <Slider class="relative carousel carousel-center col-start-2 col-end-2 row-start-1 row-end-4 ">
              {list?.map((
                { href, image, label, buttonText, video, negative },
                index,
              ) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-auto max-h-full"
                >
                  <div>
                    <a
                      href={href}
                      class={`relative h-[100%] flex`}
                    >
                      {video
                        ? (
                          <Video
                            src={video}
                            width={720}
                            height={480}
                            muted
                            autoPlay
                            loop
                            class="h-4/5 object-cover w-full"
                          />
                        )
                        : image
                        ? (
                          <Image
                            src={image!}
                            height={447}
                            width={320}
                            alt={"banner image"}
                            loading="lazy"
                            class="w-full"
                          />
                        )
                        : null}

                      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#21212191]">
                      </div>

                      <div class="absolute left-0 right-0 flex flex-col items-center gap-4 uppercase m-6 bottom-0 lg:bottom-[100px]">
                        <h3 class="text-secondary-neutral-100 text-[32px]">
                          {label}
                        </h3>
                        <ButtonBanner
                          class={negative
                            ? ""
                            : "font-normal bg-transparent border-secondary-neutral-100 text-sm text-secondary-neutral-100 uppercase py-3 px-6"}
                          aria-label={label}
                          negative={negative}
                        >
                          {buttonText}
                        </ButtonBanner>
                      </div>
                    </a>
                  </div>
                </Slider.Item>
              ))}
            </Slider>

            <div class="flex items-center justify-start z-10 col-start-1 row-start-2 absolute bottom-[-15px] lg:bottom-16 left-3">
              <Slider.PrevButton
                class={"btn btn-circle btn-sm"}
              >
                <Icon
                  class="text-base-content"
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={0.01}
                />
              </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-end z-10 col-start-3 row-start-2 absolute bottom-[-15px] lg:bottom-16 right-3">
              <Slider.NextButton
                class={"btn btn-circle btn-sm"}
              >
                <Icon
                  class="text-base-content"
                  size={24}
                  id="ChevronRight"
                  strokeWidth={0.01}
                />
              </Slider.NextButton>
            </div>

            <ul
              class={`carousel grid grid-cols-${list.length} mt-[40px] lg:mt-[-80px] items-end col-span-full z-10 row-start-4 w-[calc(100%-100px)] m-auto bg-secondary-neutral-600`}
            >
              {list?.map((_, index) => (
                <li class="carousel-item w-full">
                  <Slider.Dot index={index} class="w-full">
                    <div class="w-full h-[2px] group-disabled:bg-dark-blue bg-transparent" />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            <Slider.JS
              rootId={id}
              interval={interval && interval * 1e3}
              infinite
            />
          </div>
        )
        : (
          <div
            class={`grid px-4 lg:px-0 ${
              isBannerRowList ? "md:grid-cols-3" : "md:grid-cols-2"
            } grid-cols-1 mt-6 gap-4`}
          >
            {list?.map((
              { href, image, label, buttonText, video, negative },
            ) => (
              <div>
                <a
                  href={href}
                  class={`relative h-[100%] flex ${
                    layout.categoryCard?.textAlignment === "left"
                      ? "justify-start"
                      : "justify-start items-center"
                  } ${
                    layout.categoryCard?.textPosition === "bottom"
                      ? "flex-col-reverse"
                      : "flex-col"
                  }`}
                >
                  {video
                    ? (
                      <Video
                        src={video}
                        width={720}
                        height={480}
                        muted
                        autoPlay
                        loop
                        class={`h-full object-cover w-full`}
                      />
                    )
                    : image
                    ? (
                      <figure>
                        <Image
                          class={`w-full`}
                          src={image}
                          alt={label ?? "shop by category banner"}
                          width={isBannerRowList ? 421 : 770}
                          height={isBannerRowList ? 561 : 721}
                          loading="lazy"
                        />
                      </figure>
                    )
                    : null}

                  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#21212191]">
                  </div>

                  <div class="absolute flex flex-col items-center gap-4 uppercase m-6">
                    <h3 class="text-secondary-neutral-100 text-2xl lg:text-[32px]">
                      {label}
                    </h3>
                    <ButtonBanner
                      class={negative
                        ? ""
                        : "font-normal text-xs lg:text-sm bg-transparent border-secondary-neutral-100 text-secondary-neutral-100 uppercase py-3 px-6"}
                      aria-label={label}
                      negative={negative}
                    >
                      {buttonText}
                    </ButtonBanner>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default CategoryGrid;
