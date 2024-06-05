/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { Product, Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "../../apps/site.ts";
import ProductCardHeader from "../../components/product/ProductCardHeader.tsx";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { sendEvent } from "../../sdk/analytics.tsx";
import { useId } from "../../sdk/useId.ts";
import { useSuggestions } from "../../sdk/useSuggestions.ts";
import { useUI } from "../../sdk/useUI.ts";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "O que você procura?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const userSearches = useSignal<string[]>([]);
  const searchInputLength = searchInputRef?.current?.value?.length ?? 0;

  if (IS_BROWSER) {
    const getUserSearches = localStorage.getItem("userSearches") ?? "";
    const getParsedSearches = getUserSearches
      ? JSON.parse(getUserSearches) as string[]
      : null;
    const filteredSearches = getParsedSearches?.filter(Boolean);
    if (filteredSearches?.filter(Boolean)) {
      userSearches.value = filteredSearches;
    }
  }

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  const handleSearch = (product: Product) => {
    const productName = product?.isVariantOf?.name;
    const getUserSearches = localStorage.getItem("userSearches");
    const searches = getUserSearches ? JSON.parse(getUserSearches) : [];

    if (productName && !searches.includes(productName)) {
      searches.push(productName);
      return localStorage.setItem("userSearches", JSON.stringify(searches));
    }
  };

  return (
    <div
      class="w-full grid gap-8 pb-6 overflow-y-hidden lg:mt-0 animate-sliding-down shadow-header"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form
        id={id}
        action={action}
        class="join py-6 px-[1rem] lg:px-[3.5rem] bg-secondary-neutral-200"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="input border-0 border-b border-dark-blue join-item flex-grow focus:outline-none focus:border-primary-900 bg-secondary-neutral-200 placeholder:text-paragraph-color placeholder:font-light"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          aria-haspopup="listbox"
          aria-expanded={displaySearchPopup.value}
          autocomplete="off"
        />
        <Button
          type="submit"
          class="join-item btn-square shadow-none border-0 border-b border-dark-blue bg-secondary-neutral-200 mr-4"
          aria-label="Search"
          for={id}
          tabIndex={-1}
          onClick={() => handleSearch(products[0])}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={20} strokeWidth={0.01} />}
        </Button>
        <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => {
            setQuery("c");
            displaySearchPopup.value = false;
          }}
          ariaLabel={displaySearchPopup.value ? "open search" : "search closed"}
        >
          <Icon id="XMark" size={24} strokeWidth={1} class="mt-[-5px]" />
        </Button>
      </form>

      <div
        class={`overflow-y-scroll px-[1rem] lg:px-[5rem]`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1">
          <div
            class={`${
              hasProducts || searchInputLength > 2 ? "hidden" : ""
            } flex flex-col gap-6`}
          >
            {userSearches.value.length > 0
              ? (
                <>
                  <span
                    class="font-light text-xl text-paragraph-color"
                    role="heading"
                    aria-level={3}
                  >
                    Suas buscas recentes
                  </span>
                  <ul id="search-suggestion" class="flex flex-col gap-6">
                    {userSearches.value.slice(-4).map((search: string) => (
                      <li>
                        <a
                          href={`/s?q=${search}`}
                          class="flex gap-4 items-center justify-between"
                        >
                          <span
                            class="font-light text-sm lg:text-base text-paragraph-color"
                            dangerouslySetInnerHTML={{ __html: search }}
                          />
                          <span>
                            <Icon
                              id="SearchAgain"
                              size={24}
                              strokeWidth={0.01}
                            />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )
              : (
                <div class="flex flex-col items-center justify-center py-8">
                  <SearchIcon />
                  <span class="text-paragraph-color mt-4">
                    Sem Buscas Recentes
                  </span>
                </div>
              )}
          </div>
          <div
            class={`${
              !hasProducts || searchInputLength < 2 ? "hidden" : ""
            } flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden`}
          >
            {hasProducts
              ? (
                <>
                  <span
                    class="font-light text-xl text-paragraph-color"
                    role="heading"
                    aria-level={3}
                  >
                    Sugestões para você
                  </span>
                  <Slider class="carousel flex-col gap-4 lg:gap-0">
                    {products.map((product: Product, index: number) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item min-w-[200px]"
                        onClick={() => handleSearch(product)}
                      >
                        <ProductCardHeader
                          product={product}
                          index={index}
                          itemListName="Suggeestions"
                        />
                      </Slider.Item>
                    ))}
                  </Slider>
                </>
              )
              : <span>Sem sugestões para você</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;

const SearchIcon = () => (
  <svg
    width={60}
    height={63}
    viewBox="0 0 60 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M54.5176 8.0638C50.6348 3.60594 45.1403 0.872957 39.2426 0.466008C33.3449 0.0590596 27.5271 2.01147 23.0688 5.89379C15.6206 12.3807 13.3317 23.1654 17.5039 32.1231C18.3417 33.918 19.4159 35.5928 20.6979 37.1027L20.9717 37.4273L0.555435 59.094C0.182089 59.496 -0.0171526 60.0294 0.00115927 60.5777C0.0194711 61.126 0.253851 61.6449 0.653187 62.0211C1.05252 62.3973 1.58442 62.6004 2.13287 62.586C2.68133 62.5717 3.20186 62.341 3.58094 61.9444L23.9922 40.281L24.3331 40.5363C28.7379 43.8402 34.2095 45.397 39.6938 44.9067C45.178 44.4164 50.2868 41.9136 54.0355 37.8808C57.7843 33.8479 59.9079 28.5703 59.997 23.0649C60.0861 17.5595 58.1345 12.2159 54.5182 8.0638H54.5176ZM55.7975 23.9517C55.4815 28.5293 53.442 32.8169 50.0901 35.9504C46.7383 39.0839 42.3232 40.8304 37.7347 40.8378C37.3111 40.8378 36.886 40.8226 36.4595 40.7922C33.4811 40.59 30.5986 39.656 28.0676 38.0729C25.5366 36.4899 23.4354 34.3067 21.9502 31.7171C20.4651 29.1274 19.642 26.2113 19.5538 23.2273C19.4656 20.2433 20.1152 17.2837 21.4448 14.6109C22.7744 11.9381 24.7431 9.63466 27.1762 7.90493C29.6093 6.1752 32.4316 5.0726 35.3929 4.69491C38.3542 4.31723 41.3629 4.67612 44.1523 5.73977C46.9417 6.80342 49.4255 8.53896 51.3834 10.7925C52.952 12.5855 54.1497 14.6717 54.9074 16.9303C55.665 19.189 55.9676 21.5754 55.7975 23.9517Z"
      fill="#C9CACB"
    />
  </svg>
);
