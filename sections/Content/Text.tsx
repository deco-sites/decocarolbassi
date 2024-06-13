import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  text: HTMLWidget;
  containerWidth?: number;
}

const DEFAULT_TEXT =
  '<p><span style="font-size: 36pt;" data-mce-style="font-size: 36pt;"><strong>Rich Text</strong></span></p><p><span style="font-size: 24pt;" data-mce-style="font-size: 24pt;"><strong>Rich Text</strong></span></p><p><span style="font-size: 18pt;" data-mce-style="font-size: 18pt;"><strong>Rich Text</strong></span></p><p><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;"><strong>Rich Text</strong></span></p>';

export default function RichText(
  { title, text = DEFAULT_TEXT, containerWidth }: Props,
) {
  return (
    <div
      class="px-8"
      style={{
        maxWidth: containerWidth ? containerWidth : 960,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2 class="uppercase leading-[110%] text-2xl lg:text-[40px] mt-[41px] lg:mt-[80px] mb-2">
        {title}
      </h2>
      <div class="font-light leading-[150%] text-base lg:text-[18px] text-[#4B5565]">
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          style={{
            maxWidth: containerWidth ? containerWidth : 1440,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
        </div>
      </div>
    </div>
  );
}
