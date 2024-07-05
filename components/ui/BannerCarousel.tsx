import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Video from "apps/website/components/Video.tsx";
import { Device } from "apps/website/matchers/device.ts";
import { SectionProps } from "deco/types.ts";
import { AppContext } from "../../apps/site.ts";
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
    buttonPositionDesktop?: "Left" | "Center" | "Right";
    buttonPositionMobile?: "Left" | "Center" | "Right";
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
  { element, lcp, id, device }: {
    element: Element;
    lcp?: boolean;
    id: string;
    device: Device;
  },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
    video,
  } = element;

  const alignDesktopButton = {
    "Left": "justify-left",
    "Center": "md:justify-center",
    "Right": "md:justify-end",
  };

  const alignMobileButton = {
    "Left": "justify-left",
    "Center": "justify-center",
    "Right": "md:justify-end",
  };
  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative overflow-y-hidden w-full h-full"
    >
      {action && (
        <div
          class={`w-full h-full absolute z-10 flex items-end ${
            alignMobileButton[action?.buttonPositionMobile!]
          } ${alignDesktopButton[action?.buttonPositionDesktop!]}`}
        >
          <div class="flex flex-col justify-center items-center gap-4 px-8 py-6">
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
        </div>
      )}
      {video
        ? (
          <Video
            src={video}
            width={1920}
            height={907}
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
              width={390}
              height={614}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={desktop!}
              width={1920}
              height={907}
            />
            <img
              class="object-fill w-full h-full mt-5 sm:mt-0"
              loading={lcp ? "eager" : "lazy"}
              src={desktop}
              alt={alt ?? "carousel banner"}
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
        <Slider.PrevButton class="btn bg-transparent border-0 btn-circle group hover:bg-secondary-neutral-600">
          <Icon
            class="text-base-100 group-hover:text-primary-900"
            size={24}
            id="ChevronLeft"
            strokeWidth={1}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn bg-transparent border-0 btn-circle group hover:bg-secondary-neutral-600">
          <Icon
            class="text-base-100 group-hover:text-primary-900"
            size={24}
            id="ChevronRight"
            strokeWidth={1}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: SectionProps<typeof loader>) {
  const id = useId();
  const { elements, preload, interval, device } = props;

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6 max-h-[100dvh] sm:max-h-full">
        {elements?.map((element, index) => {
          const params = { promotion_name: element.alt };
          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                element={element}
                device={device}
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

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default BannerCarousel;
