import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { JSX } from "preact";
import { useRef } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop?: ImageWidget;
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
  const successEmailMessage = useSignal("");
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.masterdata.createDocument({
        data: { email },
        acronym: "NL",
      });

      successEmailMessage.value = "E-mail cadastrado com sucesso!";
    } finally {
      loading.value = false;
      setTimeout(
        () => {
          successEmailMessage.value = "";
          if (emailRef.current) emailRef.current.value = "";
        },
        5000,
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: content?.form?.backgroundColor !== "#000000"
          ? content?.form?.backgroundColor
          : "#121926",
      }}
      class={clx(
        "flex flex-col gap-4",
        tiled &&
          "lg:flex-row lg:w-full lg:justify-between lg:flex-1 lg:items-center",
      )}
    >
      <div class="flex lg:flex-1.5 flex-col w-full py-5 px-5 lg:px-[26px] 2xl:px-[80px]">
        {content?.title && (
          <h3
            style={{
              color: content?.form?.color !== "#000000"
                ? content?.form?.color
                : undefined,
            }}
            class="text-[20px] lg:text-[28px] text-neutral-200 font-medium whitespace-pre"
          >
            {content.title}
          </h3>
        )}

        {content?.description && (
          <p
            style={{
              color: content?.form?.color !== "#000000"
                ? content?.form?.color
                : undefined,
            }}
            class="text-[14px] text-neutral-200 font-light max-w-[390px] mt-1 mb-4"
          >
            {content.description}
          </p>
        )}
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 relative w-full">
            <input
              ref={emailRef}
              name="email"
              class="flex-auto h-10 border-0 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="h-10 min-h-10 btn absolute right-0 disabled:loading"
              disabled={loading}
            >
              <ArrowNewsIcon />
            </button>
            <span
              style={{
                color: content?.form?.color !== "#000000"
                  ? content?.form?.color
                  : undefined,
              }}
              class={`absolute -bottom-8 ${
                successEmailMessage.value ? "block text-neutral-200" : "hidden"
              }`}
            >
              {successEmailMessage.value}
            </span>
          </div>
        </form>
      </div>

      <Picture class="lg:flex-4">
        <Source
          media="(min-width: 768px)"
          fetchPriority={"low"}
          src={images?.desktop ?? ""}
          width={888}
          height={322}
        />
        <img
          class="hidden lg:block object-cover w-full h-full"
          loading={"lazy"}
          src={images?.desktop}
          alt={images?.alt ?? "footer banner"}
        />
      </Picture>
    </div>
  );
}

export default Newsletter;

const ArrowNewsIcon = () => (
  <svg
    width={14}
    height={12}
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0731 6.50003H0.5C0.357683 6.50003 0.238775 6.45227 0.143275 6.35675C0.0477584 6.26125 0 6.14235 0 6.00003C0 5.85771 0.0477584 5.7388 0.143275 5.6433C0.238775 5.54779 0.357683 5.50003 0.5 5.50003H12.0731L8.33845 1.7654C8.24102 1.66797 8.19006 1.55323 8.18557 1.42118C8.18109 1.28913 8.23205 1.16798 8.33845 1.05773C8.44872 0.947462 8.56763 0.891371 8.6952 0.889454C8.82277 0.887521 8.94168 0.941688 9.05193 1.05195L13.4346 5.43465C13.5218 5.52182 13.583 5.61092 13.6183 5.70195C13.6535 5.79297 13.6712 5.89233 13.6712 6.00003C13.6712 6.10773 13.6535 6.20709 13.6183 6.2981C13.583 6.38914 13.5218 6.47824 13.4346 6.5654L9.05193 10.9481C8.95449 11.0455 8.83878 11.0965 8.7048 11.101C8.57083 11.1055 8.44872 11.0526 8.33845 10.9423C8.23205 10.8321 8.17788 10.7141 8.17595 10.5885C8.17403 10.4628 8.2282 10.3449 8.33845 10.2347L12.0731 6.50003Z"
      fill="#121926"
    />
  </svg>
);
