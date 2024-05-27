import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

const fontSizeClasses = {
  "Small": "lg:text-2xl",
  "Normal": "lg:text-3xl",
  "Large": "lg:text-4xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={clx(
                    "text-[24px] lg:text-[32px] font-normal leading-8 lg:leading-10 uppercase",
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-dark-blue",
                  )}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <p
                  class={clx(
                    "leading-6 lg:leading-8 font-light text-[18px]",
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-paragraph-color",
                  )}
                >
                  {props.description}
                </p>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
