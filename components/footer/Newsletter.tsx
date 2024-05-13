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
  /** @format color */
  backgroundColor?: string;
  /** @format color */
  color?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
    images?: Banner;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { images } = content;

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
      style={{ backgroundColor: content?.form?.backgroundColor !== "#000000" ? content?.form?.backgroundColor : "#121926" }}
      class={clx(
        "flex flex-col gap-4",
        tiled &&
        "lg:flex-row lg:w-full lg:justify-between lg:flex-1 lg:items-center",
      )}
    >
      <div class="flex flex-col w-full gap-4 py-5 px-5 lg:pl-[26px] lg:pr-[80px] xl:pl-[120px]">
        {content?.title && (
          <h3 style={{ color: content?.form?.color !== "#000000" ? content?.form?.color : undefined }}
            class="text-[20px] lg:text-[28px] text-neutral-200 font-light">{content.title}
          </h3>
        )}

        {content?.description && (
          <p style={{ color: content?.form?.color !== "#000000" ? content?.form?.color : undefined }}
            class="text-[14px] text-neutral-200 font-light">{content.description}
          </p>
        )}
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 relative w-full">
            <input
              name="email"
              class="flex-auto input input-bordered md:w-80 text-base-content pr-0"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn absolute right-0 disabled:loading"
              disabled={loading}
            >
              <img src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/9166/e39a0e1d-b911-4d6c-9fba-0fa6008c6936" alt="Flecha" loading={"lazy"} />
            </button>
          </div>
        </form>
      </div>

      <Picture>
        {images?.mobile ? (
          <Source
            media="(max-width: 767px)"
            fetchPriority={"low"}
            src={images?.mobile ?? ""}
            width={430}
            height={590}
          />
        ) : null}

        <Source
          media="(min-width: 768px)"
          fetchPriority={"low"}
          src={images?.desktop ?? ""}
          width={1440}
          height={600}
        />
        <img
          class="object-contain w-full h-full"
          loading={"lazy"}
          src={images?.desktop}
          alt={images?.alt}
        />
      </Picture>
    </div>
  );
}

export default Newsletter;
