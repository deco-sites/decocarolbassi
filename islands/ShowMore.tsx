import { PageInfo } from "apps/commerce/types.ts";
import type { ComponentChildren } from "preact";
import { useEffect, useMemo } from "preact/hooks";
import ButtonBanner from "../components/ui/ButtonBanner.tsx";
import { useShowMore } from "../sdk/useShowMore.ts";

export interface Props {
  children: ComponentChildren;
  pageInfo: PageInfo;
}

export default function ShowMore(
  { children, pageInfo }: Props,
) {
  const { currentPage, loading } = useShowMore();

  const loadedPage = pageInfo.currentPage;
  const isFirstPage = !pageInfo.previousPage;
  const isAtPage = useMemo(() => currentPage.value === loadedPage, [
    currentPage.value,
  ]);

  useEffect(() => {
    if (!isFirstPage) {
      loading.value = false;
    }
    currentPage.value = loadedPage;
  }, []);

  return (
    <div
      class={(isAtPage && pageInfo.nextPage)
        ? "flex justify-center col-span-full mt-16 mb-28 relative"
        : "hidden"}
    >
      {children}
      <ButtonBanner
        class={`btn cursor-pointer absolute ${loading.value ? "hidden" : ""}`}
        onClick={() => {
          loading.value = true;
          const element = document.getElementById(
            `show-more-button-${loadedPage}`,
          );
          if (element) {
            element.click();
          }
          if (pageInfo.nextPage) {
            const url = new URL(pageInfo.nextPage, window.location.href);
            url.searchParams.delete("partial");
            window.history.replaceState({}, "", url.toString());
          }
        }}
      >
        VER MAIS PRODUTOS
      </ButtonBanner>
      <p class="font-light text-xs mt-[-1.5rem]">
        Total de {pageInfo.records} Produtos
      </p>
    </div>
  );
}
