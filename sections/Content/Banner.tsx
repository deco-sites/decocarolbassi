import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
  };
}

export default function Banner({ image }: Props) {
  return (
    <Picture preload={true}>
      <Source
        media="(max-width: 767px)"
        fetchPriority={"high"}
        src={image.mobile!}
        width={430}
        height={590}
      />
      <Source
        media="(min-width: 768px)"
        fetchPriority={"high"}
        src={image.desktop!}
        width={1440}
        height={600}
      />
      <img
        class="object-cover w-full h-full"
        loading={"eager"}
        src={image.desktop}
        alt={"quem somos banner"}
      />
    </Picture>
  );
}
