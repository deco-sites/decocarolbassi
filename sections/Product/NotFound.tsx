import { ProductListingPage } from "apps/commerce/types.ts";
import Button from "../../components/ui/ButtonBanner.tsx";

export interface Props {
  page?: ProductListingPage | null;
}

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound({ page }: Props) {
  return (
    <>
      <h2 class="max-w-[1750px] px-4 sm:px-8 pt-6 text-dark-blue font-light sm:font-normal text-base sm:text-[24px] m-auto leading-[150%]">
        RESULTADO DA BUSCA POR:{" "}
        <strong class="uppercase font-semibold text-dark-blue text-base sm:text-[24px]">
          {page?.seo?.title !== "Category_Page_Title" && page?.seo?.title}
        </strong>
      </h2>
      <div class="w-full flex flex-col justify-center items-center py-28 text-center">
        <div>
          <h2 class="text-dark-blue text-[40px] leading-[120%]">OOPS!</h2>
          <p class="text-paragraph-color font-light text-sm">
            Não encontramos resultados para essa busca
          </p>
        </div>

        <div class="my-8 text-paragraph-color font-light text-xs">
          <div></div>
          <h4>Como melhorar sua busca?</h4>

          <ul class="mt-4">
            <li class="leading-[150%]">Verifique os termos digitados.</li>
            <li class="leading-[150%]">Tente utilizar uma única palavra.</li>
            <li class="leading-[150%]">Utilize termos genéricos na busca.</li>
            <li class="leading-[150%]">
              Procure utilizar sinônimos ao termo desejado.
            </li>
          </ul>
        </div>

        <a href="/">
          <Button>
            VOLTAR PARA A HOME
          </Button>
        </a>
      </div>
    </>
  );
}

export default NotFound;
