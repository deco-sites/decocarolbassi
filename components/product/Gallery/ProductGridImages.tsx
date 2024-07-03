import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import { useId } from "../../../sdk/useId.ts";
import { useUI } from "../../../sdk/useUI.ts";

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

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [], video: videos = [] } },
    layout,
  } = props;

  const { width, height } = layout || { width: 300, height: 370 };

  const aspectRatio = `${width} / ${height}`;
  const productVideo = videos[0];

  const { displayProductZoomModal } = useUI();

  const handleClick = () => {
    displayProductZoomModal.value = true;
  };

  return (
    <div id={id} class="">
      {/* Image Slider */}
      <div class="sm:hidden relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-[14px] w-screen sm:w-[40vw]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-11/12"
              onClick={handleClick}
            >
              {img.name?.toLocaleLowerCase() === "novas"
                ? (
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={width}
                    height={height}
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )
                : (
                  <img
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    src={img.url!}
                    alt={img.alternateName}
                    width={500}
                    height={749}
                    style={{ aspectRatio: "500/749" }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
            </Slider.Item>
          ))}
        </Slider>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      <div class="hidden relative order-1 sm:order-2 sm:grid grid-cols-2 gap-[10px]">
        {images.slice(0, 1).map((image, index) => {
          return (
            <figure
              style={{ aspectRatio: ASPECT_RATIO }}
              class="hover:cursor-zoom-in"
              onClick={handleClick}
            >
              {image.name?.toLowerCase() === "novas"
                ? (
                  <Image
                    src={image.url!}
                    alt={image.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    style={{ aspectRatio: ASPECT_RATIO }}
                    preload={index <= 4}
                    loading={index <= 4 ? "eager" : "lazy"}
                  />
                )
                : (
                  <img
                    src={image.url!}
                    alt={image.alternateName}
                    width={500}
                    height={749}
                    style={{ aspectRatio: "500/749" }}
                    loading={index <= 4 ? "eager" : "lazy"}
                    class="object-fill"
                  />
                )}
            </figure>
          );
        })}
        {productVideo && (
          <figure
            style={{
              aspectRatio: ASPECT_RATIO,
              maxWidth: WIDTH,
              maxHeightheight: HEIGHT,
            }}
            class="relative hover:cursor-zoom-in"
            onClick={handleClick}
          >
            <Video
              src={productVideo.contentUrl!}
              width={WIDTH}
              height={HEIGHT}
              muted
              autoPlay
              loop
              class="object-none w-full h-full"
              style={{ aspectRatio: ASPECT_RATIO }}
            />
          </figure>
        )}

        {images.slice(1).map((image, index) => {
          return (
            <figure
              style={{ aspectRatio: ASPECT_RATIO }}
              class="hover:cursor-zoom-in"
              onClick={handleClick}
            >
              {image.name?.toLowerCase() === "novas"
                ? (
                  <Image
                    src={image.url!}
                    alt={image.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    style={{ aspectRatio: ASPECT_RATIO }}
                    preload={index <= 4}
                    loading={index <= 4 ? "eager" : "lazy"}
                  />
                )
                : (
                  <img
                    src={image.url!}
                    alt={image.alternateName}
                    width={500}
                    height={749}
                    style={{ aspectRatio: "500/749" }}
                    loading={index <= 4 ? "eager" : "lazy"}
                    class="object-fill"
                  />
                )}
            </figure>
          );
        })}

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      <Slider.JS rootId={id} />
    </div>
  );
}
