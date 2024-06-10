import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import type { ComponentChildren, JSX } from "preact";

function Dot({ index, children, class: _class = "" }: {
  index: number;
  class?: string;
  children: ComponentChildren;
}) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      className={` focus:outline-none group ${_class}`}
    >
      {children}
    </button>
  );
}

function DotImage({ index, children, class: _class = "" }: {
  index: number;
  class?: string;
  children: ComponentChildren;
}) {
  return (
    <button
      data-dot-image={index}
      aria-label={`go to slider item ${index}`}
      className={` focus:outline-none group ${_class}`}
    >
      {children}
    </button>
  );
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
}

const setup = ({ rootId, scroll, interval, infinite }: Props) => {
  const ATTRIBUTES = {
    "data-slider": "data-slider",
    "data-slider-item": "data-slider-item",
    'data-slide="prev"': 'data-slide="prev"',
    'data-slide="next"': 'data-slide="next"',
    "data-dot": "data-dot",
    "data-dot-image": "data-dot-image",
  };

  // Percentage of the item that has to be inside the container
  // for it it be considered as inside the container
  const THRESHOLD = 0.6;

  const intersectionX = (element: DOMRect, container: DOMRect): number => {
    const delta = container.width / 1_000;

    if (element.right < container.left - delta) {
      return 0.0;
    }

    if (element.left > container.right + delta) {
      return 0.0;
    }

    if (element.left < container.left - delta) {
      return element.right - container.left + delta;
    }

    if (element.right > container.right + delta) {
      return container.right - element.left + delta;
    }

    return element.width;
  };

  // as any are ok in typeguard functions
  const isHTMLElement = (x: Element): x is HTMLElement =>
    // deno-lint-ignore no-explicit-any
    typeof (x as any).offsetLeft === "number";

  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);
  const dotsImage = root?.querySelectorAll(`[${ATTRIBUTES["data-dot-image"]}]`);

  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, rootId },
    );

    return;
  }

  let isMouseDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: any) => {
    const event = e as MouseEvent;
    isMouseDown = true;
    if (!isHTMLElement(slider)) return;
    startX = event.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const onMouseUp = () => {
    isMouseDown = false;
  };

  const onMouseMove = (e: any) => {
    const event = e as MouseEvent;
    event.preventDefault();
    if (!isHTMLElement(slider) || !isMouseDown) return;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;

    setTimeout(() => {
      isMouseDown = false;
    }, 500);
  };

  slider.addEventListener("mousedown", onMouseDown);
  slider.addEventListener("mouseup", onMouseUp);
  slider.addEventListener("mouseleave", onMouseUp);
  slider.addEventListener("mousemove", onMouseMove);

  const getElementsInsideContainer = () => {
    const indices: number[] = [];
    const sliderRect = slider.getBoundingClientRect();

    for (let index = 0; index < items.length; index++) {
      const item = items.item(index);
      const rect = item.getBoundingClientRect();

      const ratio = intersectionX(
        rect,
        sliderRect,
      ) / rect.width;

      if (ratio > THRESHOLD) {
        indices.push(index);
      }
    }

    return indices;
  };

  const goToItem = (index: number) => {
    const item = items.item(index);

    if (!isHTMLElement(item)) {
      console.warn(
        `Element at index ${index} is not an html element. Skipping carousel`,
      );

      return;
    }

    slider.scrollTo({
      top: 0,
      behavior: scroll,
      left: item.offsetLeft - root.offsetLeft,
    });
  };

  const onClickPrev = () => {
    const indices = getElementsInsideContainer();
    // Wow! items per page is how many elements are being displayed inside the container!!
    const itemsPerPage = indices.length;

    const isShowingFirst = indices[0] === 0;
    const pageIndex = Math.floor(indices[indices.length - 1] / itemsPerPage);

    goToItem(
      isShowingFirst ? items.length - 1 : (pageIndex - 1) * itemsPerPage,
    );
  };

  const onClickNext = () => {
    const indices = getElementsInsideContainer();
    // Wow! items per page is how many elements are being displayed inside the container!!
    const itemsPerPage = indices.length;

    const isShowingLast = indices[indices.length - 1] === items.length - 1;
    const pageIndex = Math.floor(indices[0] / itemsPerPage);

    goToItem(isShowingLast ? 0 : (pageIndex + 1) * itemsPerPage);
  };

  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        const index = Number(item.target.getAttribute("data-slider-item")) || 0;
        const dot = dots?.item(index);
        const dotImage = dotsImage ? dotsImage?.item(index) : null;

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
          dotImage ? dotImage?.setAttribute("disabled", "") : null;
        } else {
          dot?.removeAttribute("disabled");
          dotImage ? dotImage?.removeAttribute("disabled") : null;
        }

        if (!infinite) {
          if (index === 0) {
            if (item.isIntersecting) {
              prev?.setAttribute("disabled", "");
            } else {
              prev?.removeAttribute("disabled");
            }
          }
          if (index === items.length - 1) {
            if (item.isIntersecting) {
              next?.setAttribute("disabled", "");
            } else {
              next?.removeAttribute("disabled");
            }
          }
        }
      }),
    { threshold: THRESHOLD, root: slider },
  );

  items.forEach((item) => observer.observe(item));

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToItem(it));
    if (dotsImage) {
      const item = dotsImage.item(it);
      if (item) {
        item.addEventListener("click", () => goToItem(it));
      }
    }
  }

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
      if (dotsImage) {
        const item = dotsImage.item(it);
        if (item) {
          item.removeEventListener("click", () => goToItem(it));
        }
      }
    }

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);

    slider.removeEventListener("mousedown", onMouseDown);
    slider.removeEventListener("mouseup", onMouseUp);
    slider.removeEventListener("mouseleave", onMouseUp);
    slider.removeEventListener("mousemove", onMouseMove);

    observer.disconnect();

    clearInterval(timeout);
  };
};

function JS({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
}: Props) {
  return (
    <script
      src={scriptAsDataURI(setup, { rootId, scroll, interval, infinite })}
      defer
    />
  );
}

Slider.Dot = Dot;
Slider.DotImage = DotImage;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;
Slider.JS = JS;

export default Slider;
