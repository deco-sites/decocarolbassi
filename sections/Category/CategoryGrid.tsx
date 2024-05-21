import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Button from "../../components/ui/Button.tsx";

export interface CategoryGridProps {
  href?: string;
  video?: VideoWidget;
  image?: ImageWidget;
  /** @description Alternative text */
  label?: string;
  buttonText?: string;
}

export interface Props {
  header?: {
    /**
     * @default Explore Our Categories
     */
    title?: string;
    /**
     * @default Your description here
     */
    description?: string;
  };
  list?: CategoryGridProps[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

const DEFAULT_LIST = [
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
  },
  {
    href: "/category",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    label: "category",
    video: "",
    buttonText: "Explore collection",
  },
];

function CategoryGrid(props: Props) {
  const id = useId();
  const {
    header = {
      title: "Explore Our Categories",
      description: "Your description",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "bottom",
        textAlignment: "left",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container mt-16"
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      />

      <div class="grid md:grid-cols-2 grid-cols-1 mt-6 gap-4">
        {list?.map((
          { href, image, label, buttonText, video },
        ) => (
           <div>
            <a
              href={href}
              class={`relative h-[100%] flex ${
                layout.categoryCard?.textAlignment === "left"
                  ? "justify-start"
                  : "justify-start items-center"
              } ${
                layout.categoryCard?.textPosition === "bottom"
                  ? "flex-col-reverse"
                  : "flex-col"
              }`}
            >
              {video ? (
                <Video src={video} width={720} height={480} muted autoPlay loop class="h-full object-cover w-full"/>
              ): image ? (
                   <figure>
                    <Image
                      class="w-full"
                      src={image}
                      alt={label}
                      width={720}
                      height={480}
                      loading="lazy"
                    />
                  </figure>
              ): null}

                <div class="absolute flex flex-col items-center gap-4 uppercase m-6">
                  <h3 class="text-secondary-neutral-100 text-[32px]">{label}</h3>
                  <Button
                    class="font-normal bg-transparent text-sm text-secondary-neutral-100 uppercase py-4 px-6"
                    aria-label={label}
                    >
                    {buttonText}
                  </Button>
                </div>
            </a>
          </div>
))}
      </div>
    </div>
  );
}

export default CategoryGrid;
