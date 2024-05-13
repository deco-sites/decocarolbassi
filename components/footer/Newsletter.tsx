import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { JSX } from "preact";
import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop?: ImageWidget;
  /** @description mobile otimized image */
  mobile?: ImageWidget;
  /** @description Image's alt text */
  alt?: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
    images?: Banner;
    lcp?: boolean;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { images, lcp } = content;

  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4 bg-[#121926]",
        tiled &&
          "lg:flex-row lg:w-full lg:justify-between lg:flex-1 lg:items-center",
      )}
    >
      <div class="flex flex-col gap-4 px-[120px]">
        {content?.title && (
          <h3 class="text-[28px] text-slate-100">{content.title}</h3>
        )}

        {content?.description && (
          <p class="text-[14px] text-slate-100">{content.description}</p>
        )}

        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 relative">
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn absolute right-0 disabled:loading"
              disabled={loading}
            >
              {content?.form?.buttonText || "->"}
            </button>
          </div>
        </form>
      </div>

      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={images?.mobile ?? ""}
          width={430}
          height={590}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={images?.desktop ?? ""}
          width={1440}
          height={600}
        />
        <img
          class="object-contain w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={images?.desktop}
          alt={images?.alt}
        />
      </Picture>
    </div>
  );
}

export default Newsletter;
