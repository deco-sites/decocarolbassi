import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */

const WIDTH = 624;
const HEIGHT = 731;
const ASPECT_RATIO = `${WIDTH}/${HEIGHT}`;

export default function ProductGridImages(props: Props) {
  const id = useId();

  // console.log(props.page);

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout,
  } = props;

  const { width, height } = layout || { width: 300, height: 370 };

  const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="">
      {/* Image Slider */}
      <div class="sm:hidden relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
          disabled
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      <div class="hidden relative order-1 sm:order-2 sm:grid grid-cols-2 gap-[10px]">
        {images.map((image, index) => {
          return (
            <figure style={{ ASPECT_RATIO }}>
              <Image
                src={image.url!}
                width={WIDTH}
                height={HEIGHT}
                style={{ ASPECT_RATIO }}
                preload={index <= 4}
                loading={index <= 4 ? "eager" : "lazy"}
              />
            </figure>
          );
        })}
      </div>

      <Slider.JS rootId={id} />
    </div>
  );
}
