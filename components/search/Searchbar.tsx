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

  if (IS_BROWSER) {
    const getUserSearches = localStorage.getItem('userSearches') ?? "";
    const parsedSearches = getUserSearches ? JSON.parse(getUserSearches) as string[] : null;
    if (parsedSearches) userSearches.value = parsedSearches;
  }

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  const handleSearch = (product: Product) => {
    const productName = product?.isVariantOf?.name;
    const getUserSearches = localStorage.getItem('userSearches');
    const searches = getUserSearches ? JSON.parse(getUserSearches) : [];

    if (!searches.includes(productName)) {
      searches.push(productName);
      return localStorage.setItem('userSearches', JSON.stringify(searches));
    }
  }

  return (
    <div
      class="w-full grid gap-8 pb-6 overflow-y-hidden mt-[3rem] lg:mt-0 animate-sliding-down"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join py-6 px-[1rem] lg:px-[3.5rem] bg-secondary-neutral-200" >
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
          class="join-item btn-square shadow-none border-0 border-b border-dark-blue bg-secondary-neutral-200"
          aria-label="Search"
          for={id}
          tabIndex={-1}
          onClick={() => handleSearch(products[0])}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={2} />}
        </Button>
        <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => {
            setQuery("c")
            displaySearchPopup.value = false;
          }}
          ariaLabel={displaySearchPopup.value ? "open search" : "search closed"}
        >
          <Icon id="XMark" size={24} strokeWidth={2} class="mt-[-5px]" />
        </Button>
      </form>

      <div
        class={`overflow-y-scroll px-[1rem] lg:px-[5rem]`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1">
          <div class={`${hasProducts ? "hidden" : ''} flex flex flex-col gap-6`}>
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
                  <a href={`/s?q=${search}`} class="flex gap-4 items-center justify-between">
                    <span class="font-light text-sm lg:text-base text-paragraph-color" dangerouslySetInnerHTML={{ __html: search }} />
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
          </div>
          <div class={`${!hasProducts ? 'hidden' : ''} flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden`}>
            <span
              class="font-light text-xl text-paragraph-color ml-4"
              role="heading"
              aria-level={3}
            >
              Sugestões para você
            </span>
            <Slider class="carousel flex-col">
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
          </div>
        </div>
      </div>
    </div >
  );
}

export default Searchbar;
