import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Video from "apps/website/components/Video.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "../../components/Analytics.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import ButtonBanner from "./ButtonBanner.tsx";

/**
 * @titleBy alt
 */
export interface Element {
  video?: VideoWidget;
  /** @description desktop otimized image */
  desktop?: ImageWidget;
  /** @description mobile otimized image */
  mobile?: ImageWidget;
  /** @description Image's alt text */
  alt?: string;
  action?: {
    /** @description active to turn the button negative */
    buttonNegative?: boolean;
    /** @description button position */
    buttonPositionDesktop?: "Center" | "Right";
    buttonPositionMobile?: "Center" | "Left";
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  elements?: Element[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  elements: [
    {
      alt: "/feminino",
      action: {
        buttonNegative: false,
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        buttonNegative: false,
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        buttonNegative: false,
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function BannerItem(
  { element, lcp, id }: { element: Element; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
    video,
  } = element;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative overflow-y-hidden w-full"
    >
      {action && (
        // <div class="absolute bottom-6 right-8 top-0 md:bottom-0 lg:right-20 max-w-full flex flex-col justify-end items-end gap-4 px-12 py-24">
        <div class="absolute z-10 bottom-0 translate-x-[50%] translate-y-[calc(100%-80px)]  lg:right-12 lg:px-12 lg:py-12 lg:translate-x-0 lg:translate-y-0">
          <span class="text-2xl font-light text-base-100">
            {action.title}
          </span>
          <span class="font-normal text-4xl text-base-100">
            {action.subTitle}
          </span>

          <ButtonBanner
            aria-label={action.label}
            negative={element.action?.buttonNegative}
          >
            {action.label}
          </ButtonBanner>
        </div>
      )}
      {video
        ? (
          <Video
            src={video}
            width={1440}
            height={500}
            controls={false}
            autoPlay
            loop
            muted
            class="w-full h-full object-cover"
          />
        )
        : (
          <Picture preload={lcp}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={mobile!}
              width={430}
              height={590}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={desktop!}
              width={1440}
              height={600}
            />
            <img
              class="object-cover w-full h-full"
              loading={lcp ? "eager" : "lazy"}
              src={desktop}
              alt={alt}
            />
          </Picture>
        )}
    </a>
  );
}

function Dots({ elements, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-6 z-10 row-start-4">
        {elements?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle glass">
          <Icon
            class="text-base-100"
            size={24}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { elements, preload, interval } = props;

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min min-h-[660px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 max-h-[85dvh] md:max-h-[700px]">
        {elements?.map((element, index) => {
          const params = { promotion_name: element.alt };
          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                element={element}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots elements={elements} interval={interval} />}

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
