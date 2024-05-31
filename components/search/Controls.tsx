import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      class="drawer-end"
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden md:w-[480px] md:p-4">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-normal text-xl text-dark-blue">Filtros</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={1} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto border-none">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
          <Button
            class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            <span class={"text-paragraph-color font-light text-sm"}>
              Filtrar e ordernar
            </span>
            <Icon
              id="FilterOptions"
              width={16}
              height={16}
              stroke-width={0.01}
            />
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
