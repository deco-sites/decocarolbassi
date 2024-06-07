import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  images: ImageObject[];
  width: number;
  height: number;
}

const WIDTH = 624;
const HEIGHT = 731;
const ASPECT_RATIO = `${WIDTH}/${HEIGHT}`;

function ProductImageZoom({ images, width, height }: Props) {
  const id = useId();
  const { displayProductZoomModal } = useUI();

  return (
    <div id={id}>
      <Modal
        loading="lazy"
        open={displayProductZoomModal.value}
        onClose={() => displayProductZoomModal.value = false}
      >
        <div class="modal-box w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
          <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
            {images.map((image, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full h-full justify-center items-center"
              >
                <Image
                  style={{ aspectRatio: `${width} / ${height}` }}
                  src={image.url!}
                  alt={image.alternateName}
                  width={width}
                  height={height}
                  class="h-full w-auto"
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton class="btn btn-circle btn-outline col-start-1 col-end-2 row-start-1 row-span-full">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton class="btn btn-circle btn-outline col-start-3 col-end-4 row-start-1 row-span-full">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>

          <ul class="carousel carousel-center gap-1 px-4 sm:px-0 sm:flex-col order-2 sm:order-1">
            {images.map((img, index) => (
              <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border rounded "
                    width={100}
                    height={123}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          <Slider.JS rootId={id} />
        </div>
      </Modal>
    </div>
  );
}

export default ProductImageZoom;
