import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { SectionProps } from "deco/types.ts";
import Icon from "../ui/Icon.tsx";

/** @title {{{matcher}}} */
export interface SeoTextProps {
  /**
   * @title Url da Página
   * @description Coloque a url da página, por exemplo /sapatos
   */
  matcher: string;
  title?: string;
  /** @format html */
  description: string;
}

/** @title Textos SEO */
export interface Props {
  seoTexts: SeoTextProps[];
  /** @readonly */
  showMore?: boolean;
}

function CategorySeoText(
  { categorySeoText, showMore = false }: SectionProps<typeof loader>,
) {
  if (!categorySeoText) return null;
  const { title, description } = categorySeoText;
  const shortDescription = description.substring(0, 600);

  return (
    <div className="container flex flex-col items-center justify-center text-center pb-20 px-4">
      <h2 className="text-xl text-dark-blue">{title}</h2>
      <div className="text-paragraph-color text-sm font-light mt-2 mb-6">
        <p
          dangerouslySetInnerHTML={{
            __html: showMore ? description : shortDescription,
          }}
        />
      </div>

      <button
        class="flex font-light hover:underline justify-center items-center text-paragraph-color text-base w-auto"
        {...usePartialSection({
          props: { showMore: !showMore },
        })}
      >
        {!showMore ? "Ver mais" : "Mostrar Menos"}
        {!showMore
          ? <Icon id="ArrowDown" size={26} />
          : <Icon id="ArrowDown" size={26} class={"rotate-180"} />}
      </button>
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const { seoTexts } = props;

  const categorySeoText = seoTexts.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { categorySeoText, ...props };
};

export default CategorySeoText;
