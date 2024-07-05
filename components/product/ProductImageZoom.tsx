import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useRef } from "preact/hooks";
import Modal from "../../components/ui/Modal.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useUI } from "../../sdk/useUI.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  images: ImageObject[];
}

const WIDTH = 624;
const HEIGHT = 731;
const ASPECT_RATIO = `${WIDTH}/${HEIGHT}`;

function ProductImageZoom({ images }: Props) {
  const id = useId();
  const { displayProductZoomModal, productZoomIndex } = useUI();

  const handleMouseMove = (e: any, containerRef: any) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = container.querySelector("img");
    const zoomFactor = 2;
    const offsetX = ((x / rect.width) * 100) * (zoomFactor - 1);
    const offsetY = ((y / rect.height) * 100) * (zoomFactor - 1);

    img.style.transformOrigin = `${offsetX}% ${offsetY}%`;
    img.style.transform = `scale(${zoomFactor})`;
  };

  const handleMouseLeave = (containerRef: any) => {
    const img = containerRef.current.querySelector("img");
    img.style.transform = "scale(1)";
  };

  return (
    <div id={id}>
      <Modal
        loading="eager"
        open={displayProductZoomModal.value}
        onClose={() => {
          displayProductZoomModal.value = false;
        }}
      >
        <div class="modal-box w-full max-w-full h-full max-h-full grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center bg-[#eef2f6] p-0 rounded-none">
          <div class="cursor-pointer absolute right-7 top-6 md:right-14 md:top-14 z-10">
            <Icon
              id="XMark"
              size={24}
              strokeWidth={1}
              onClick={() => {
                displayProductZoomModal.value = false;
              }}
            />
          </div>

          <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
            {images.map((image, index) => {
              const containerRef = useRef(null);
              return (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full h-[calc(100%-120px)] md:h-full justify-center items-center md:pt-8"
                >
                  <div
                    className="zoom-container h-full w-auto hover:cursor-crosshair"
                    ref={containerRef}
                    onMouseMove={(e) => handleMouseMove(e, containerRef)}
                    onMouseLeave={() => handleMouseLeave(containerRef)}
                    style={{ aspectRatio: ASPECT_RATIO }}
                  >
                    <img
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={image.url!}
                      alt={image.alternateName}
                      class="h-full w-auto object-contain"
                      loading={"lazy"}
                    />
                  </div>
                </Slider.Item>
              );
            })}
          </Slider>
          <div class="hidden absolute bottom-14 md:flex gap-4 w-2/3">
            <Slider.PrevButton
              onClick={() =>
                productZoomIndex.value = productZoomIndex.value - 1}
              class="bg-transparent"
            >
              <Icon size={24} id="ChevronLeft" strokeWidth={0.01} />
            </Slider.PrevButton>

            <ul
              class={`carousel grid grid-cols-${images.length} items-end col-span-full z-0 row-start-4 w-[calc(100%-130px)] m-auto bg-secondary-neutral-600`}
            >
              {images?.map((_, index) => (
                <li class="carousel-item w-full">
                  <Slider.Dot index={index} class="w-full">
                    <div class="w-full h-[2px] group-disabled:bg-dark-blue bg-transparent" />
                  </Slider.Dot>
                </li>
              ))}
            </ul>

            <Slider.NextButton
              onClick={() =>
                productZoomIndex.value = productZoomIndex.value + 1}
              class="bg-transparent"
            >
              <Icon size={24} id="ChevronRight" strokeWidth={0.01} />
            </Slider.NextButton>
          </div>

          <ul class="absolute left-0 bottom-0 sm:left-0 sm:bottom-[168px] md:bottom-auto carousel carousel-center gap-1 px-0 sm:flex-col order-2 sm:order-1">
            {images.map((img, index) => {
              return (
                <li
                  class="carousel-item min-w-[63px] sm:min-w-[100px]"
                  onClick={() => productZoomIndex.value = index}
                >
                  <Slider.DotImage index={index}>
                    <Image
                      style={{ aspectRatio: "200/246" }}
                      class={`group-disabled:border-base-700 group-disabled:border group-disabled:rounded `}
                      width={100}
                      height={123}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.DotImage>
                </li>
              );
            })}
          </ul>

          <Slider.JS rootId={id} />
        </div>
      </Modal>
    </div>
  );
}

export default ProductImageZoom;
